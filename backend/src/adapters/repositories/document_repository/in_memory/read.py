from adapters.persistence.in_memory import InMemoryStore
from domain.entities.document import Document
from ports.repositories.document_read_repository import DocumentReadRepository


class InMemoryReadRepository(DocumentReadRepository):
    def __init__(self, store: InMemoryStore[Document]) -> None:
        self._store = store

    async def get_by_id(self, document_id: int) -> Document | None:
        return self._find_by_id(document_id)

    def _find_by_id(self, document_id: int) -> Document | None:
        for doc in self._store.documents:
            if doc.id == document_id:
                return doc
        return None

    async def get_by_user_id(self, user_id: int) -> list[Document] | None:
        user_documents = [
            document
            for document in self._store.documents
            if (user_id in document.allowed_to_modify or user_id == document.owner_id)
        ]

        return user_documents if user_documents else None
