# Known Differences and Audit Findings

The goal is to preserve what the supplied artifacts actually show rather than forcing every source to agree.

## WAHA engine

The historical report architecture figure labels WAHA “Mode GOWS”. The current runtime information supplied for this repository identifies WAHA 2026.8.2 CORE with `WEBJS`, and the supplied current WAHA `.env` also sets `WHATSAPP_DEFAULT_ENGINE=WEBJS`. The public runtime template therefore uses WEBJS while retaining the report figure as historical documentation.

## Vector indexing

The report discusses HNSW for pgVector. The audited production-derived `pg_indexes` output and schema-only dump show no HNSW or IVFFlat index on `documents.embedding`; only the primary-key index was present for `documents`. HNSW is therefore placed under `database/optional/` as an explicit enhancement, not represented as an existing production fact.

## Vector dimension

The audited schema defines `documents.embedding` as `vector(768)`. The exact HuggingFace model is not encoded in the exported embedding node parameters, so no model name is invented in this repository.

## `column_names`

The audited `record_manager.column_names` type is `TEXT`. AI tool instructions expect this text to contain a JSON-array representation and instruct the agent to parse it. The migration follows the actual audited SQL type.

## Dynamic tables

The supplied production schema snapshot contains concrete `data_*` and `ref_*` tables created from actual ingestion history. They are preserved in the schema snapshot for structural provenance but are excluded from the core migration because the ingestion workflow creates them dynamically.

## Image tags

The original n8n Compose used `n8nio/n8n:latest` even though the running n8n version was 2.6.3. The original WAHA Compose used an untagged `devlikeapro/waha` image. The public reference uses the observed image digests/exact dependency versions to reduce drift.

## Workflow activation state

The final supplied exports had mixed active states. For safety, every public workflow template is inactive regardless of the original export state.
