from application.queries.schemas.document_read_schemas import GetDocumentQuery
from domain.entities.document import Document
from ports.repositories.document_read_repository import DocumentReadRepository


class GetDocumentHandler:
    def __init__(self, document_read_repository: DocumentReadRepository) -> None:
        self.document_read_repository = document_read_repository

    async def handle(self, query: GetDocumentQuery) -> Document:
        document = await self.document_read_repository.get_by_id(query.document_id)
        if document is None:
            raise ValueError(f"Document with id {query.document_id} not found")
        return document
