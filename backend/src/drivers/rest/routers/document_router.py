from dataclasses import dataclass

from fastapi import APIRouter, Depends, HTTPException

from application.commands.schemas.document_write_schemas import (
    CreateDocumentCommand,
    DeleteCharCommand,
    InsertCharCommand,
    SaveDocumentCommand,
)
from application.queries.schemas.document_read_schemas import (
    GetDocumentQuery,
    GetUserDocumentsQuery,
)
from composition import Container
from domain.entities.crdt import Char, CharId
from domain.entities.document import Document
from drivers.rest.dependencies import get_container

router = APIRouter()


@dataclass
class CharIdPayload:
    local_counter: int
    user_id: int


@dataclass
class CreateDocumentPayload:
    owner_id: int
    title: str
    description: str


@dataclass
class SaveDocumentPayload:
    title: str
    description: str


@dataclass
class InsertCharPayload:
    owner_id: int
    value: str
    local_counter: int
    parent_id: CharIdPayload | None = None


@dataclass
class DeleteCharPayload:
    owner_id: int
    char_id: CharIdPayload


def _to_char_id(payload: CharIdPayload) -> CharId:
    return CharId(local_counter=payload.local_counter, user_id=payload.user_id)


def _serialize_char(char: Char) -> dict[str, object]:
    return {
        "char_id": {
            "local_counter": char.char_id.local_counter,
            "user_id": char.char_id.user_id,
        },
        "value": char.value,
        "parent_id": (
            {
                "local_counter": char.parent_id.local_counter,
                "user_id": char.parent_id.user_id,
            }
            if char.parent_id is not None
            else None
        ),
        "deleted": char.deleted,
    }


def _serialize_document(document: Document) -> dict[str, object]:
    return {
        "id": document.id,
        "owner_id": document.owner_id,
        "title": document.title,
        "description": document.description,
        "allowed_to_modify": sorted(document.allowed_to_modify),
        "version": document.version,
        "content": [_serialize_char(char) for char in document.content],
    }


@router.post("/documents")
async def create_document(
    payload: CreateDocumentPayload, container: Container = Depends(get_container)
) -> dict[str, int]:
    command = CreateDocumentCommand(
        owner_id=payload.owner_id, title=payload.title, description=payload.description
    )
    document_id = await container.create_document.handle(command)
    return {"document_id": document_id}


@router.put("/documents/{document_id}")
async def save_document(
    document_id: int,
    payload: SaveDocumentPayload,
    container: Container = Depends(get_container),
) -> dict[str, int]:
    command = SaveDocumentCommand(
        document_id=document_id, title=payload.title, description=payload.description
    )
    try:
        saved_index = await container.save_document.handle(command)
    except ValueError as error:
        raise HTTPException(status_code=404, detail=str(error)) from error
    return {"saved_index": saved_index}


@router.post("/documents/{document_id}/chars")
async def insert_char(
    document_id: int,
    payload: InsertCharPayload,
    container: Container = Depends(get_container),
) -> dict[str, object] | None:
    command = InsertCharCommand(
        owner_id=payload.owner_id,
        document_id=document_id,
        value=payload.value,
        local_counter=payload.local_counter,
        parent_id=(
            _to_char_id(payload.parent_id) if payload.parent_id is not None else None
        ),
    )
    try:
        inserted_char = await container.insert_symbol.handle(command)
    except ValueError as error:
        raise HTTPException(status_code=404, detail=str(error)) from error

    if inserted_char is None:
        return None
    return _serialize_char(inserted_char)


@router.delete("/documents/{document_id}/chars")
async def delete_char(
    document_id: int,
    payload: DeleteCharPayload,
    container: Container = Depends(get_container),
) -> dict[str, object] | None:
    command = DeleteCharCommand(
        owner_id=payload.owner_id,
        document_id=document_id,
        char_id=_to_char_id(payload.char_id),
    )
    try:
        deleted_char = await container.delete_symbol.handle(command)
    except ValueError as error:
        raise HTTPException(status_code=404, detail=str(error)) from error

    if deleted_char is None:
        return None
    return _serialize_char(deleted_char)


@router.get("/documents/{document_id}")
async def get_document(
    document_id: int, container: Container = Depends(get_container)
) -> dict[str, object]:
    query = GetDocumentQuery(document_id=document_id)
    try:
        document = await container.get_document.handle(query)
    except ValueError as error:
        raise HTTPException(status_code=404, detail=str(error)) from error
    return _serialize_document(document)


@router.get("/users/{user_id}/documents")
async def get_user_documents(
    user_id: int, container: Container = Depends(get_container)
) -> list[dict[str, object]]:
    query = GetUserDocumentsQuery(user_id=user_id)
    documents = await container.get_user_documents.handle(query)
    return [_serialize_document(document) for document in documents]
