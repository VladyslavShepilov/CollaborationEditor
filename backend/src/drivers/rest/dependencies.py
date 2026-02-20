from fastapi import Request

from composition import Container


def get_container(request: Request) -> Container:
    """FastAPI dependency that provides the composed Container from app state."""
    return request.app.state.container
