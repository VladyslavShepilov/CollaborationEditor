from adapters.persistence.in_memory import InMemoryStore
from domain.entities.document import Document
from ports.repositories.document_write_repository import DocumentWriteRepository


class InMemoryWriteRepository(DocumentWriteRepository):
    def __init__(self, store: InMemoryStore[Document]) -> None:
        self._store = store

    async def save(self, document: Document) -> int:
        for i, doc in enumerate(self._store.documents):
            if doc.id == document.id:
                self._store.documents[i] = document
                return i

        document.id = self._store.next_id()
        self._store.documents.append(document)
        return len(self._store.documents)
