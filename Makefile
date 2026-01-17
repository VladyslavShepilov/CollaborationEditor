.PHONY: dev down build update-schema-frontend

# Start development environment
dev:
	docker-compose up --build

# Stop all containers
down:
	docker-compose down

# Build without starting
build:
	docker-compose build

update-schema-frontend:
	cd backend && uv run python -c "import json; from main import app; print(json.dumps(app.openapi()))" > ../frontend/src/openapi.json
	cd frontend && npx openapi-typescript src/openapi.json -o src/api.d.ts
	rm frontend/src/openapi.json
