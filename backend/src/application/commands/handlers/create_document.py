from application.commands.schemas.document_write_schemas import CreateDocumentCommand
from domain.entities.document import Document
from ports.repositories.document_write_repository import DocumentWriteRepository


class CreateDocumentHandler:
    def __init__(self, document_write_repository: DocumentWriteRepository) -> None:
        self.document_write_repository = document_write_repository

    async def handle(self, command: CreateDocumentCommand) -> int:
        document = Document(
            id=0,
            owner_id=command.owner_id,
            title=command.title,
            description=command.description,
        )
        return await self.document_write_repository.create(document)
