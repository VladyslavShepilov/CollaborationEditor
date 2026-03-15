from dataclasses import dataclass
from enum import StrEnum

from adapters.persistence.in_memory import InMemoryStore
from adapters.repositories.document_repository.in_memory.persistent import (
    InMemoryPersistentRepository,
)
from adapters.repositories.document_repository.in_memory.read import (
    InMemoryReadRepository,
)
from adapters.repositories.document_repository.in_memory.write import (
    InMemoryWriteRepository,
)
from application.commands.handlers.create_document import CreateDocumentHandler
from application.commands.handlers.delete_symbol import DeleteSymbolHandler
from application.commands.handlers.insert_symbol import InsertSymbolHandler
from application.commands.handlers.save_document import SaveDocumentHandler
from application.queries.handlers.get_document import GetDocumentHandler
from application.queries.handlers.get_user_documents import GetUserDocumentsHandler
from domain.entities.document import Document
from ports.repositories.document_persistence_repository import (
    DocumentPersistenceRepository,
)
from ports.repositories.document_read_repository import DocumentReadRepository
from ports.repositories.document_write_repository import DocumentWriteRepository


class TemporaryStorageBackend(StrEnum):
    IN_MEMORY = "in_memory"


class PersistenceStorageBackend(StrEnum):
    IN_MEMORY = "in_memory"


@dataclass
class Container:
    """Composed handlers"""

    create_document: CreateDocumentHandler
    save_document: SaveDocumentHandler
    insert_symbol: InsertSymbolHandler
    delete_symbol: DeleteSymbolHandler
    get_document: GetDocumentHandler
    get_user_documents: GetUserDocumentsHandler


def _build_temporary_repositories(
    temporary_storage: TemporaryStorageBackend,
) -> tuple[DocumentWriteRepository, DocumentReadRepository]:
    match temporary_storage:
        case TemporaryStorageBackend.IN_MEMORY:
            temporary_store = InMemoryStore[Document]()
            return (
                InMemoryWriteRepository(temporary_store),
                InMemoryReadRepository(temporary_store),
            )
        case _:
            raise ValueError(f"Unknown temporary storage backend: {temporary_storage}")


def _build_persistence_repository(
    persistence_storage: PersistenceStorageBackend,
) -> DocumentPersistenceRepository:
    match persistence_storage:
        case PersistenceStorageBackend.IN_MEMORY:
            persistent_store = InMemoryStore[Document]()
            return InMemoryPersistentRepository(persistent_store)
        case _:
            raise ValueError(
                f"Unknown persistence storage backend: {persistence_storage}"
            )


def build_container(
    temporary_storage: TemporaryStorageBackend = TemporaryStorageBackend.IN_MEMORY,
    persistence_storage: PersistenceStorageBackend = PersistenceStorageBackend.IN_MEMORY,
) -> Container:
    write_repo, read_repo = _build_temporary_repositories(temporary_storage)
    persistent_repo = _build_persistence_repository(persistence_storage)

    return Container(
        create_document=CreateDocumentHandler(write_repo, persistent_repo),
        save_document=SaveDocumentHandler(write_repo, read_repo, persistent_repo),
        insert_symbol=InsertSymbolHandler(read_repo, write_repo),
        delete_symbol=DeleteSymbolHandler(read_repo, write_repo),
        get_document=GetDocumentHandler(read_repo),
        get_user_documents=GetUserDocumentsHandler(read_repo),
    )
