from fastapi import FastAPI
from routers import utils_router


def create_app():
    app = FastAPI()
    app.include_router(
        utils_router,
        prefix="utils/",
    )

    return app
