from __future__ import annotations

from dataclasses import dataclass, field

from .crdt import Char, CharId


@dataclass
class Document:
    id: int
    owner_id: int
    allowed_to_modify: set[int] = field(default_factory=set)
    version: int = 0

    content: list[Char] = field(default_factory=list)

    # handle cases when parent delivered later than children
    pending_children: dict[CharId, list[Char]] = field(default_factory=dict)

    def __post_init__(self):
        self.allowed_to_modify.add(self.owner_id)

    def find_index(self, char_id: CharId) -> int | None:
        for i, ch in enumerate(self.content):
            if ch.char_id == char_id:
                return i

        return None
