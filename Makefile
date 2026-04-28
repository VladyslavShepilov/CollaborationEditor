.PHONY: dev down build update-schema-frontend

up:
	docker compose up -d

# Start development environment
dev:
	docker compose up --build

# Stop all containers
down:
	docker compose down

# Build without starting
build:
	docker compose build

update-schema-frontend:
	cd backend && PYTHONPATH=src uv run python -c "import json; from drivers.rest.main import create_app; print(json.dumps(create_app().openapi()))" > ../frontend/src/openapi.json
	cd frontend && rm -rf src/shared/api/generated && yarn dlx -p openapi-typescript-codegen openapi --input src/openapi.json --output src/shared/api/generated --client fetch
	rm frontend/src/openapi.json
