.PHONY: validate network supabase-up supabase-down app-up app-down migrate up down

validate:
	python3 scripts/validate_repo.py

network:
	docker network inspect shared-net >/dev/null 2>&1 || docker network create shared-net

supabase-up: network
	cd infrastructure/supabase && docker compose --env-file .env up -d

supabase-down:
	cd infrastructure/supabase && docker compose --env-file .env down

app-up: network
	docker compose --env-file .env up -d --build

app-down:
	docker compose --env-file .env down

migrate:
	./scripts/apply-migrations.sh

up: supabase-up migrate app-up

down: app-down supabase-down
