from application.commands.schemas.document_write_schemas import SaveDocumentCommand
from ports.repositories.document_read_repository import DocumentReadRepository
from ports.repositories.document_write_repository import DocumentWriteRepository


class SaveDocumentHandler:
    def __init__(
        self,
        document_write_repository: DocumentWriteRepository,
        document_read_repository: DocumentReadRepository,
    ) -> None:
        self.document_write_repository = document_write_repository
        self.document_read_repository = document_read_repository

    async def handle(self, command: SaveDocumentCommand) -> int:
        existing_document = await self.document_read_repository.get_by_id(
            command.document_id
        )
        if existing_document is None:
            raise ValueError(f"Document with id {command.document_id} not found")

        existing_document.title = command.title
        existing_document.description = command.description
        return await self.document_write_repository.save(existing_document)
