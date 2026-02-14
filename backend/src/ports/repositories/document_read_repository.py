from abc import ABC, abstractmethod

from domain.entities.document import Document


class DocumentReadRepository(ABC):
    @abstractmethod
    async def get_by_id(self, document_id: int) -> Document | None:
        pass

    @abstractmethod
    async def get_by_user_id(self, user_id: int) -> list[Document] | None:
        pass
