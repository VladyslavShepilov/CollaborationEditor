from abc import ABC, abstractmethod

from domain.entities.crdt import Char, CharId
from domain.entities.document import Document


class DocumentWriteRepository(ABC):
    @abstractmethod
    async def create(self, document: Document) -> int:
        pass

    @abstractmethod
    async def save(self, document: Document) -> int:
        pass

    @abstractmethod
    async def insert_char(self, document: Document, char: Char) -> Char | None:
        pass

    @abstractmethod
    async def delete_char(self, document: Document, char_id: CharId) -> Char | None:
        pass
