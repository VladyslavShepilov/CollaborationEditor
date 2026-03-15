from adapters.persistence.in_memory import InMemoryStore
from domain.entities.crdt import Char, CharId
from domain.entities.document import Document
from ports.repositories.document_write_repository import DocumentWriteRepository


class InMemoryWriteRepository(DocumentWriteRepository):
    def __init__(self, store: InMemoryStore[Document]) -> None:
        self._store = store

    async def create(self, document: Document) -> int:
        document.id = self._store.next_id()
        self._store.documents.append(document)
        return document.id

    async def save(self, document: Document) -> int:
        for i, doc in enumerate(self._store.documents):
            if doc.id == document.id:
                self._store.documents[i] = document
                return i

        raise ValueError(f"Document with id {document.id} not found")

    async def insert_char(self, document: Document, char: Char) -> Char | None:
        return document.insert(char)

    async def delete_char(self, document: Document, char_id: CharId) -> Char | None:
        return document.delete(char_id)
