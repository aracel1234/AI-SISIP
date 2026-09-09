# Runtime and Version Inventory

## Core runtime supplied by the user

| Component | Version / image |
|---|---|
| Docker | 29.6.1 |
| Docker Compose | v5.3.1 |
| n8n | 2.6.3; original Compose used `n8nio/n8n:latest` |
| n8n image digest observed | `sha256:a9beb0dcaa547f0742a322f497af72127338d6ab8f3697b3be44f8ab737726f2` |
| WAHA | 2026.8.2 CORE, WEBJS |
| WAHA image digest observed | `sha256:527ff3d634925adb26d596883d7b3ca502c080f737af3c2af2be0c973c511533` |
| n8n-nodes-deepseek-reasoner | 0.10.34 |
| n8n-nodes-deepseek | 1.0.6 |
| n8n-nodes-waha | 2024.11.5 |

## Supabase containers observed

| Container | Image |
|---|---|
| Studio | `supabase/studio:2026.02.16-sha-26c615c` |
| Storage | `supabase/storage-api:v1.37.8` |
| Meta | `supabase/postgres-meta:v0.95.2` |
| Pooler | `supabase/supavisor:2.7.4` |
| Realtime | `supabase/realtime:v2.76.5` |
| Auth | `supabase/gotrue:v2.186.0` |
| Edge Functions | `supabase/edge-runtime:v1.70.3` |
| Kong | `kong:2.8.1` |
| PostgREST | `postgrest/postgrest:v14.5` |
| Analytics | `supabase/logflare:1.31.2` |
| PostgreSQL | `supabase/postgres:15.8.1.085` |
| imgproxy | `darthsim/imgproxy:v3.30.1` |
| Vector logging | `timberio/vector:0.53.0-alpine` |

The supplied `infrastructure/supabase/versions.md` is retained as the production-derived version reference.
