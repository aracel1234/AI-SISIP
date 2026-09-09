# AI SISIP

**Sanitized public portfolio/reference implementation** of an AI Agent Chatbot built for the SISIP context, using n8n orchestration, self-hosted Supabase/PostgreSQL + pgVector, HuggingFace embeddings, DeepSeek models, Google Drive ingestion, WAHA WhatsApp gateway, and an AI-assisted self-healing workflow.

> This repository is **not an official repository of the Ministry of Tourism of the Republic of Indonesia**. Production credentials, WhatsApp sessions, private data, raw production logs, Google Drive documents, database rows, and n8n credential objects are intentionally excluded.

> **No open-source LICENSE file is provided at this time.** Public visibility does not by itself grant an open-source license.

![AI SISIP architecture from the PKL report](docs/images/architecture-report-figure-5-1.png)

## What is included

- Four final n8n workflows, sanitized for public import and disabled by default.
- Readable mirrors of custom JavaScript Code Nodes and long AI/tool prompts.
- Production-derived database schema snapshot plus reproducible core migrations.
- Current runtime/version inventory from the supplied duplicate server.
- n8n Docker image definition with the exact community-node versions used.
- WAHA runtime pinned to the exact observed image digest.
- Production-derived Supabase Docker Compose and version history.
- Full testing artifacts reconstructed from the PKL report tables.
- Workflow screenshots and the architecture figure from the report.
- Security, deployment, credential, RAG, database, self-healing, and GitHub-push documentation.
- Repository validation and secret-scanning helpers.

## Main workflows

| Workflow | Purpose |
|---|---|
| `01-ai-agent-chatbot-sisip.json` | WhatsApp inference pipeline: event filtering, message-age validation, intent classification, SQL/vector tool routing, response formatting, and session-status notifications. |
| `02-data-ingestion-pipeline.json` | Periodic Google Drive ingestion: multi-format extraction, SHA-256 change detection, AI labelling, text/vector processing, and dynamic tabular-table creation. |
| `03-data-deletion-pipeline.json` | Synchronizes Trash/deletion state between Google Drive and Supabase, deleting vectors or dynamic tables and metadata as appropriate. |
| `04-ai-self-healing-engine.json` | Centralized error workflow for diagnosis and `FIX` / `RETRY` / `SKIP` handling, plus administrator notifications. |

All public workflow templates have `active: false`, `pinData` removed, credential references removed, instance/workflow IDs removed, and known hardcoded environment-specific values replaced with environment expressions.

## Runtime baseline

| Component | Supplied runtime |
|---|---|
| n8n | 2.6.3 |
| `n8n-nodes-deepseek-reasoner` | 0.10.34 |
| `n8n-nodes-deepseek` | 1.0.6 |
| `n8n-nodes-waha` | 2024.11.5 |
| WAHA | 2026.8.2 CORE, WEBJS engine |
| PostgreSQL | Supabase PostgreSQL 15.8.1.085 |
| pgVector | 0.8.0 |
| Docker | 29.6.1 |
| Docker Compose | v5.3.1 |

See `docs/runtime-and-versions.md` for the full Supabase container inventory.

## Quick start

1. Copy environment templates:

```bash
cp .env.example .env
cp infrastructure/supabase/.env.example infrastructure/supabase/.env
```

2. Replace every `change_me` value. Generate new Supabase JWT/service keys using the official self-hosted Supabase key-generation procedure. **Never reuse values from the supplied production/duplicate environment.**

3. Prepare the upstream Supabase vendor assets referenced by its Compose file. See `infrastructure/supabase/UPSTREAM_ASSETS.md`.

4. Create the shared network:

```bash
docker network inspect shared-net >/dev/null 2>&1 || docker network create shared-net
```

5. Start Supabase:

```bash
cd infrastructure/supabase
docker compose --env-file .env up -d
cd ../..
```

6. Apply AI SISIP migrations:

```bash
./scripts/apply-migrations.sh
```

7. Build and start n8n + WAHA:

```bash
docker compose --env-file .env up -d --build
```

8. Open n8n at `http://localhost:5678`, create the credentials listed in `docs/credentials.md`, then import the four files from `workflows/`.

9. Configure your own Google Drive `AI SISIP` source folder and set `GOOGLE_DRIVE_FOLDER_ID` in `.env`. Put only documents/data that you are authorized to process. See `examples/README.md` and `docs/data-ingestion.md`.

10. Activate workflows only after credentials, database, Drive folder, WAHA session, and error-workflow relationships are verified. The public exports are intentionally inactive.

## Reported test results

The repository reproduces the supplied PKL report tables, not newly invented measurements:

- Intent classification accuracy: **95% (38/40)**.
- Retrieval average Precision@K: **80.87%**.
- Overall workflow execution duration average: **9.53 seconds**.
- Workflow execution success during the observed test period: **100% (111/111)**.

Machine-readable tables are in `tests/` and interpretation/source caveats are in `docs/testing.md`.

## Important audited differences

The current duplicate runtime and database audit contain a few differences from historical report wording/figures. They are documented rather than silently reconciled. Notably, the report architecture figure labels WAHA as GOWS while the supplied current runtime uses WEBJS; and the audited `documents.embedding` column has no HNSW/IVFFlat index even though the report discusses HNSW. See `docs/known-differences.md`.

## Documentation

Start with:

- `docs/architecture.md`
- `docs/deployment.md`
- `docs/credentials.md`
- `docs/data-ingestion.md`
- `docs/database.md`
- `docs/rag-pipeline.md`
- `docs/self-healing.md`
- `docs/security.md`
- `docs/testing.md`
- `docs/known-differences.md`
- `PUSH_TO_GITHUB.md`

## Repository destination

Prepared for: `https://github.com/aracel1234/AI-SISIP`
