# Deployment Guide

## 1. Prerequisites

The supplied runtime was observed with Docker 29.6.1 and Docker Compose v5.3.1. The repository may work on other recent versions, but those were not part of the supplied audit.

## 2. Environment files

Copy `.env.example` and `infrastructure/supabase/.env.example` to `.env` files and replace placeholders. Do not reuse production values that appeared in development exports.

## 3. Shared network

All three groups—Supabase, n8n, and WAHA—communicate through external Docker network `shared-net`.

```bash
docker network inspect shared-net >/dev/null 2>&1 || docker network create shared-net
```

## 4. Supabase

The supplied Supabase Compose is preserved in `infrastructure/supabase/docker-compose.yml`. It references upstream vendor assets under `volumes/`; see `infrastructure/supabase/UPSTREAM_ASSETS.md` before starting.

```bash
cd infrastructure/supabase
docker compose --env-file .env up -d
cd ../..
```

## 5. AI SISIP schema

```bash
./scripts/apply-migrations.sh
```

## 6. n8n and WAHA

```bash
docker compose --env-file .env up -d --build
```

The custom n8n image installs the exact community node versions observed in the supplied instance. WAHA is pinned to the observed image digest.

## 7. n8n credentials and workflow import

Create the credentials in `credentials.md`, then import each JSON from `workflows/`. Reconnect every credential field in the editor. Keep all four workflows inactive until configuration is complete.

## 8. WAHA session

Open the WAHA dashboard using your configured local URL, create/authenticate a session with a test/authorized WhatsApp account, and verify the session is WORKING before enabling the inference workflow.

## 9. Google Drive

Set the Drive root ID and provide authorized text/tabular sources. The public repository contains no production Drive content.

## 10. Activation order

A safe validation sequence is: Data Ingestion → Data Deletion → AI Agent Chatbot → Self-Healing last. Confirm the error workflow configuration before enabling Self-Healing because it can modify/retry other workflows.
