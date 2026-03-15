from copy import deepcopy

from adapters.persistence.in_memory import InMemoryStore
from domain.entities.document import Document
from ports.repositories.document_persistence_repository import (
    DocumentPersistenceRepository,
)


class InMemoryPersistentRepository(DocumentPersistenceRepository):
    def __init__(self, store: InMemoryStore[Document]) -> None:
        self._store = store

    async def save(self, document: Document) -> int:
        for i, doc in enumerate(self._store.documents):
            if doc.id == document.id:
                self._store.documents[i] = deepcopy(document)
                return i

        self._store.documents.append(deepcopy(document))
        return len(self._store.documents) - 1
