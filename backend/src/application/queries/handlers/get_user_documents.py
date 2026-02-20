from application.queries.schemas.document_read_schemas import GetUserDocumentsQuery
from domain.entities.document import Document
from ports.repositories.document_read_repository import DocumentReadRepository


class GetUserDocumentsHandler:
    def __init__(self, document_read_repository: DocumentReadRepository) -> None:
        self.document_read_repository = document_read_repository

    async def handle(self, query: GetUserDocumentsQuery) -> list[Document]:
        result = await self.document_read_repository.get_by_user_id(query.user_id)
        return result if result is not None else []
