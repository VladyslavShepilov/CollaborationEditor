from __future__ import annotations

from dataclasses import dataclass, field


@dataclass(order=True, frozen=True)
class CharId:
    """
    Unique identifier for a character in the CRDT.
    Ordering: Higher local_counter wins, then higher user_id as tiebreaker.
    """

    local_counter: int
    user_id: int

    def __str__(self) -> str:
        return f"{self.user_id}_{self.local_counter}"


@dataclass
class Char:
    """
    A character in the CRDT document.
    """

    char_id: CharId
    value: str
    parent_id: CharId | None = None
    deleted: bool = field(default=False, compare=False, hash=False)

    def __hash__(self) -> int:
        return hash(self.char_id)

    def __eq__(self, other: object) -> bool:
        if not isinstance(other, Char):
            return NotImplemented
        return self.char_id == other.char_id
