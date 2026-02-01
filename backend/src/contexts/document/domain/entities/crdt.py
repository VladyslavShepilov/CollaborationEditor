from __future__ import annotations

from dataclasses import dataclass


@dataclass(order=True, frozen=True)
class CharId:
    local_counter: int
    user_id: int

    def __str__(self) -> str:
        return f"{self.user_id}_{self.local_counter}"


@dataclass
class Char:
    char_id: CharId
    value: str
    parent_id: CharId | None = None
    deleted: bool = False
