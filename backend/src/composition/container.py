from dataclasses import dataclass
from enum import StrEnum

from adapters.persistence.in_memory import InMemoryStore
from adapters.repositories.document_repository.in_memory.read import (
    InMemoryReadRepository,
)
from adapters.repositories.document_repository.in_memory.write import (
    InMemoryWriteRepository,
)
from application.commands.handlers.create_document import CreateDocumentHandler
from application.commands.handlers.save_document import SaveDocumentHandler
from application.queries.handlers.get_document import GetDocumentHandler
from application.queries.handlers.get_user_documents import GetUserDocumentsHandler
from domain.entities.document import Document


class PersistenceBackend(StrEnum):
    IN_MEMORY = "in_memory"


@dataclass
class Container:
    """Composed handlers"""

    create_document: CreateDocumentHandler
    save_document: SaveDocumentHandler
    get_document: GetDocumentHandler
    get_user_documents: GetUserDocumentsHandler


def build_container(
    persistence: PersistenceBackend = PersistenceBackend.IN_MEMORY,
) -> Container:
    match persistence:
        case PersistenceBackend.IN_MEMORY:
            store = InMemoryStore[Document]()
            write_repo = InMemoryWriteRepository(store)
            read_repo = InMemoryReadRepository(store)
        case _:
            raise ValueError(f"Unknown persistence backend: {persistence}")

    return Container(
        create_document=CreateDocumentHandler(write_repo),
        save_document=SaveDocumentHandler(write_repo, read_repo),
        get_document=GetDocumentHandler(read_repo),
        get_user_documents=GetUserDocumentsHandler(read_repo),
    )
