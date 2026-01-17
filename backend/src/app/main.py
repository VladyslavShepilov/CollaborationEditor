from fastapi import FastAPI

from app.routers import utils_router


def create_app() -> FastAPI:
    app = FastAPI()
    app.include_router(
        utils_router,
        prefix="/utils",
    )

    return app
