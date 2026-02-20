from fastapi import FastAPI

from composition import Container, PersistenceBackend, build_container
from drivers.rest.routers import utils_router


def create_app() -> FastAPI:
    container: Container = build_container(persistence=PersistenceBackend.IN_MEMORY)
    app = FastAPI()
    app.state.container = container

    app.include_router(
        utils_router,
        prefix="/utils",
    )

    return app
