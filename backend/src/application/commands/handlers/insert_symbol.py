from application.commands.schemas.document_write_schemas import InsertCharCommand
from domain.entities.crdt import Char, CharId
from ports.repositories.document_read_repository import DocumentReadRepository
from ports.repositories.document_write_repository import DocumentWriteRepository


class InsertSymbolHandler:
    def __init__(
        self,
        document_read_repository: DocumentReadRepository,
        document_write_repository: DocumentWriteRepository,
    ) -> None:
        self.document_read_repository = document_read_repository
        self.document_write_repository = document_write_repository

    async def handle(self, command: InsertCharCommand) -> Char | None:
        document = await self.document_read_repository.get_by_id(command.document_id)
        if document is None:
            raise ValueError(f"Document with id {command.document_id} not found")

        new_char = Char(
            char_id=CharId(
                local_counter=command.local_counter, user_id=command.owner_id
            ),
            value=command.value,
            parent_id=command.parent_id,
        )
        inserted_char = await self.document_write_repository.insert_char(
            document, new_char
        )
        await self.document_write_repository.save(document)
        return inserted_char
