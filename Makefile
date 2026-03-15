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
	cd frontend && npx openapi-typescript src/openapi.json -o src/api.d.ts
	rm frontend/src/openapi.json
