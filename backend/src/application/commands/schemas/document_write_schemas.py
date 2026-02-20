class CreateDocumentCommand:
    owner_id: int
    title: str
    description: str


class SaveDocumentCommand:
    document_id: int
    title: str
    description: str
