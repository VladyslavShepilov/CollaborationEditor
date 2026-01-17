from dataclasses import dataclass, field
from enum import StrEnum
from typing import ClassVar


class DocumentStatus(StrEnum):
    ACTIVE = "ACTIVE"
    INACTIVE = "INACTIVE"


@dataclass
class DomainEvent:
    name: str
    payload: dict


@dataclass
class Document:
    document_id: int
    owner_id: int
    status: DocumentStatus
    last_sequence: int = 0

    _uncommitted_events: ClassVar[list[DomainEvent]] = field(default_factory=list)
