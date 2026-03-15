from pydantic import BaseModel

from drivers.rest.schemas.document.read import CharIdSchema


class CreateDocumentPayload(BaseModel):
    owner_id: int
    title: str
    description: str


class SaveDocumentPayload(BaseModel):
    title: str
    description: str


class InsertCharPayload(BaseModel):
    owner_id: int
    value: str
    local_counter: int
    parent_id: CharIdSchema | None = None


class DeleteCharPayload(BaseModel):
    owner_id: int
    char_id: CharIdSchema


class CreateDocumentResponse(BaseModel):
    document_id: int


class SaveDocumentResponse(BaseModel):
    saved_index: int
