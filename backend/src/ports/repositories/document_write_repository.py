from abc import ABC, abstractmethod

from domain.entities.document import Document


class DocumentWriteRepository(ABC):
    @abstractmethod
    async def create(self, document: Document) -> int:
        pass

    @abstractmethod
    async def save(self, document: Document) -> int:
        pass
