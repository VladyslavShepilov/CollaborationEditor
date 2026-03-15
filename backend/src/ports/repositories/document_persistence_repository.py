from abc import ABC, abstractmethod

from domain.entities.document import Document


class DocumentPersistenceRepository(ABC):
    @abstractmethod
    async def save(self, document: Document) -> int:
        pass
