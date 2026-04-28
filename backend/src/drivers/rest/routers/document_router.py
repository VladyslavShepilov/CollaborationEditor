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
from drivers.rest.dependencies import get_container
from drivers.rest.schemas.document.read import CharSchema, DocumentResponse
from drivers.rest.schemas.document.write import (
    CreateDocumentPayload,
    CreateDocumentResponse,
    DeleteCharPayload,
    InsertCharPayload,
    SaveDocumentPayload,
    SaveDocumentResponse,
)

router = APIRouter(tags=["Documents"])


@router.post("/documents", response_model=CreateDocumentResponse)
async def create_document(
    payload: CreateDocumentPayload, container: Container = Depends(get_container)
) -> CreateDocumentResponse:
    command = CreateDocumentCommand(
        owner_id=payload.owner_id, title=payload.title, description=payload.description
    )
    document_id = await container.create_document.handle(command)
    return CreateDocumentResponse(document_id=document_id)


@router.put("/documents/{document_id}", response_model=SaveDocumentResponse)
async def save_document(
    document_id: int,
    payload: SaveDocumentPayload,
    container: Container = Depends(get_container),
) -> SaveDocumentResponse:
    command = SaveDocumentCommand(
        document_id=document_id, title=payload.title, description=payload.description
    )
    try:
        saved_index = await container.save_document.handle(command)
    except ValueError as error:
        raise HTTPException(status_code=404, detail=str(error)) from error
    return SaveDocumentResponse(saved_index=saved_index)


@router.post("/documents/{document_id}/chars", response_model=CharSchema | None)
async def insert_char(
    document_id: int,
    payload: InsertCharPayload,
    container: Container = Depends(get_container),
) -> CharSchema | None:
    command = InsertCharCommand(
        owner_id=payload.owner_id,
        document_id=document_id,
        value=payload.value,
        local_counter=payload.local_counter,
        parent_id=payload.parent_id.to_domain()
        if payload.parent_id is not None
        else None,
    )
    try:
        inserted_char = await container.insert_symbol.handle(command)
    except ValueError as error:
        raise HTTPException(status_code=404, detail=str(error)) from error

    if inserted_char is None:
        return None
    return CharSchema.from_domain(inserted_char)


@router.delete("/documents/{document_id}/chars", response_model=CharSchema | None)
async def delete_char(
    document_id: int,
    payload: DeleteCharPayload,
    container: Container = Depends(get_container),
) -> CharSchema | None:
    command = DeleteCharCommand(
        owner_id=payload.owner_id,
        document_id=document_id,
        char_id=payload.char_id.to_domain(),
    )
    try:
        deleted_char = await container.delete_symbol.handle(command)
    except ValueError as error:
        raise HTTPException(status_code=404, detail=str(error)) from error

    if deleted_char is None:
        return None
    return CharSchema.from_domain(deleted_char)


@router.get("/documents/{document_id}", response_model=DocumentResponse)
async def get_document(
    document_id: int, container: Container = Depends(get_container)
) -> DocumentResponse:
    query = GetDocumentQuery(document_id=document_id)
    try:
        document = await container.get_document.handle(query)
    except ValueError as error:
        raise HTTPException(status_code=404, detail=str(error)) from error
    return DocumentResponse.from_domain(document)


@router.get("/users/{user_id}/documents", response_model=list[DocumentResponse])
async def get_user_documents(
    user_id: int, container: Container = Depends(get_container)
) -> list[DocumentResponse]:
    query = GetUserDocumentsQuery(user_id=user_id)
    documents = await container.get_user_documents.handle(query)
    return [DocumentResponse.from_domain(document) for document in documents]
