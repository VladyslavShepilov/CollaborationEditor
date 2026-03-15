from fastapi import FastAPI

from composition import (
    Container,
    PersistenceStorageBackend,
    TemporaryStorageBackend,
    build_container,
)
from drivers.rest.routers import document_router, utils_router


def create_app() -> FastAPI:
    container: Container = build_container(
        temporary_storage=TemporaryStorageBackend.IN_MEMORY,
        persistence_storage=PersistenceStorageBackend.IN_MEMORY,
    )
    app = FastAPI()
    app.state.container = container

    app.include_router(
        utils_router,
        prefix="/utils",
    )
    app.include_router(
        document_router,
    )

    return app
