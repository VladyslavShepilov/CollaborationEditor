from typing import Protocol


class HasId(Protocol):
    id: int


class InMemoryStore[T: HasId]:
    def __init__(self) -> None:
        self.documents: list[T] = []
        self._latest_id: int = 0

    def __post_init__(self):
        ids = [doc.id for doc in self.documents if doc.id]
        unique_ids = set(ids)
        if len(unique_ids) != len(ids):
            raise ValueError("")

        self._latest_id = max(unique_ids)

    def next_id(self) -> int:
        self._latest_id += 1
        return self._latest_id
