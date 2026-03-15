from dataclasses import dataclass


@dataclass
class GetDocumentQuery:
    document_id: int


@dataclass
class GetUserDocumentsQuery:
    user_id: int
