from __future__ import annotations

from dataclasses import dataclass, field

from .crdt import Char, CharId


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
    _char_index: dict[CharId, int] = field(default_factory=dict, repr=False)

    def __post_init__(self) -> None:
        self.allowed_to_modify.add(self.owner_id)
        self._rebuild_index()

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
        # if already exists, return existing index
        if (existing_char_index := self.find_index(new_char.char_id)) is not None:
            return existing_char_index

        # No parent_id means insert at head
        if new_char.parent_id is None:
            return self._insert_after_parent(-1, new_char)

        # If parent is present, insert after it
        if (parent_index := self.find_index(new_char.parent_id)) is not None:
            return self._insert_after_parent(parent_index, new_char)

        # Parent has not yet arrived - add to pending
        self.pending_children.setdefault(new_char.parent_id, []).append(new_char)
        return None
