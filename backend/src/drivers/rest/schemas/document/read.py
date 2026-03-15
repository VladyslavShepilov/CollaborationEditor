from typing import Self

from pydantic import BaseModel, ConfigDict

from domain.entities.crdt import Char, CharId
from domain.entities.document import Document


class CharIdSchema(BaseModel):
    local_counter: int
    user_id: int

    model_config = ConfigDict(from_attributes=True)

    @classmethod
    def from_domain(cls, char_id: CharId) -> Self:
        return cls(local_counter=char_id.local_counter, user_id=char_id.user_id)

    def to_domain(self) -> CharId:
        return CharId(local_counter=self.local_counter, user_id=self.user_id)


class CharSchema(BaseModel):
    char_id: CharIdSchema
    value: str
    parent_id: CharIdSchema | None = None
    deleted: bool

    model_config = ConfigDict(from_attributes=True)

    @classmethod
    def from_domain(cls, char: Char) -> Self:
        return cls(
            char_id=CharIdSchema.from_domain(char.char_id),
            value=char.value,
            parent_id=(
                CharIdSchema.from_domain(char.parent_id)
                if char.parent_id is not None
                else None
            ),
            deleted=char.deleted,
        )


class DocumentResponse(BaseModel):
    id: int
    owner_id: int
    title: str
    description: str
    allowed_to_modify: list[int]
    version: int
    content: list[CharSchema]

    model_config = ConfigDict(from_attributes=True)

    @classmethod
    def from_domain(cls, document: Document) -> Self:
        return cls(
            id=document.id,
            owner_id=document.owner_id,
            title=document.title,
            description=document.description,
            allowed_to_modify=sorted(document.allowed_to_modify),
            version=document.version,
            content=[CharSchema.from_domain(char) for char in document.content],
        )
