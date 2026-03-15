from dataclasses import dataclass

from domain.entities.crdt import CharId


@dataclass
class CreateDocumentCommand:
    owner_id: int
    title: str
    description: str


@dataclass
class SaveDocumentCommand:
    document_id: int
    title: str
    description: str


@dataclass
class InsertCharCommand:
    owner_id: int
    document_id: int
    value: str
    local_counter: int
    parent_id: CharId | None = None


@dataclass
class DeleteCharCommand:
    owner_id: int
    document_id: int
    char_id: CharId
