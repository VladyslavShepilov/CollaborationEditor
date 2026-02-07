from __future__ import annotations

from dataclasses import dataclass, field

from .crdt import Char, CharId


class InvalidRangeException(Exception):
    pass


@dataclass
class Document:
    """
    Document aggregate root with CRDT-based content.
    """

    id: int
    owner_id: int
    allowed_to_modify: set[int] = field(default_factory=set)
    version: int = 0

    content: list[Char] = field(default_factory=list)

    # Handle cases when parent delivered later than children
    pending_children: dict[CharId, list[Char]] = field(default_factory=dict)
    pending_delete: list[CharId] = field(default_factory=list)

    _char_index: dict[CharId, int] = field(default_factory=dict, repr=False)

    def __post_init__(self) -> None:
        self.allowed_to_modify.add(self.owner_id)
        self._rebuild_index()

    def _process_pending_children(self, parent_id: CharId) -> None:
        if parent_id not in self.pending_children:
            return
        children = self.pending_children.pop(parent_id)
        for child in children:
            self.insert(child)

    def _process_pending_deletes(self) -> None:
        remaining = []
        for char_id in self.pending_delete:
            if self.find_index(char_id) is not None:
                self.delete(char_id)
            else:
                remaining.append(char_id)
        self.pending_delete = remaining

    def _rebuild_index(self) -> None:
        self._char_index = {ch.char_id: i for i, ch in enumerate(self.content)}

    def _update_index_from(self, start_index: int) -> None:
        for i in range(start_index, len(self.content)):
            self._char_index[self.content[i].char_id] = i

    def find_index(self, char_id: CharId) -> int | None:
        return self._char_index.get(char_id)

    def find_char(self, char_id: CharId) -> Char | None:
        index = self.find_index(char_id)
        if index is not None:
            return self.content[index]
        return None

    def has_char(self, char_id: CharId) -> bool:
        return char_id in self._char_index

    def _insert_after_parent(self, parent_index: int, new_char: Char) -> int:
        search_start = parent_index + 1

        for i, char in enumerate(self.content[search_start:], start=search_start):
            if char.parent_id == new_char.parent_id and char.char_id > new_char.char_id:
                self.content.insert(i, new_char)
                self._update_index_from(i)
                return i

        self.content.append(new_char)
        insert_index = len(self.content) - 1
        self._char_index[new_char.char_id] = insert_index
        return insert_index

    def insert(self, new_char: Char) -> int | None:
        """
        Inserts into the document following CRDT.
        Returns int if char was inserted, 'None' otherwise.
        """
        # if already exists, return existing index

        if (existing_char_index := self.find_index(new_char.char_id)) is not None:
            return existing_char_index

        # No parent_id means insert at head

        if new_char.parent_id is None:
            insert_index = self._insert_after_parent(-1, new_char)
        # If parent is present, insert after it

        elif (parent_index := self.find_index(new_char.parent_id)) is not None:
            insert_index = self._insert_after_parent(parent_index, new_char)
        # Parent has not yet arrived - add to pending
        else:
            self.pending_children.setdefault(new_char.parent_id, []).append(new_char)
            return None

        self._process_pending_children(new_char.char_id)
        self._process_pending_deletes()
        return insert_index

    def delete(self, char_id: CharId) -> Char | None:
        if (delete_index := self.find_index(char_id)) is None:
            self.pending_delete.append(char_id)
            return None

        self.content[delete_index].deleted = True
        return self.content[delete_index]
