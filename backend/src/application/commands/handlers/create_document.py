from application.commands.schemas.document_write_schemas import CreateDocumentCommand
from domain.entities.document import Document
from ports.repositories.document_persistence_repository import (
    DocumentPersistenceRepository,
)
from ports.repositories.document_write_repository import DocumentWriteRepository


class CreateDocumentHandler:
    def __init__(
        self,
        document_write_repository: DocumentWriteRepository,
        document_persistence_repository: DocumentPersistenceRepository,
    ) -> None:
        self.document_write_repository = document_write_repository
        self.document_persistence_repository = document_persistence_repository

    async def handle(self, command: CreateDocumentCommand) -> int:
        document = Document(
            id=0,
            owner_id=command.owner_id,
            title=command.title,
            description=command.description,
        )
        document_id = await self.document_write_repository.create(document)
        await self.document_persistence_repository.save(document)
        return document_id
