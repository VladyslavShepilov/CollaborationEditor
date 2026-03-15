from application.commands.schemas.document_write_schemas import DeleteCharCommand
from domain.entities.crdt import Char
from ports.repositories.document_read_repository import DocumentReadRepository
from ports.repositories.document_write_repository import DocumentWriteRepository


class DeleteSymbolHandler:
    def __init__(
        self,
        document_read_repository: DocumentReadRepository,
        document_write_repository: DocumentWriteRepository,
    ) -> None:
        self.document_read_repository = document_read_repository
        self.document_write_repository = document_write_repository

    async def handle(self, command: DeleteCharCommand) -> Char | None:
        document = await self.document_read_repository.get_by_id(command.document_id)
        if document is None:
            raise ValueError(f"Document with id {command.document_id} not found")

        deleted_char = await self.document_write_repository.delete_char(
            document, command.char_id
        )
        await self.document_write_repository.save(document)
        return deleted_char
