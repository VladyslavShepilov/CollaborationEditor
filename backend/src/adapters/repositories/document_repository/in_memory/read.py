from adapters.persistence.in_memory import InMemoryStore
from domain.entities.document import Document
from ports.repositories.document_read_repository import DocumentReadRepository


class InMemoryReadRepository(DocumentReadRepository):
    def __init__(self, store: InMemoryStore[Document]) -> None:
        self._store = store

    async def get(self, document_id: int) -> Document | None:
        if document_id + 1 > len(self._store.documents) + 1:
            return None

        return self._store.documents[document_id]

    async def get_by_user_id(self, user_id: int) -> list[Document] | None:
        user_documents = [
            document
            for document in self._store.documents
            if (user_id in document.allowed_to_modify or user_id == document.owner_id)
        ]

        return user_documents if user_documents else None
