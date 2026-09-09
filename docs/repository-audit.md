# Repository Build Audit

## Source artifacts used

- Final n8n JSON exports for all four workflows.
- PKL report PDF for architecture, workflow descriptions, and test tables.
- n8n, WAHA, and Supabase Docker Compose files.
- Three runtime `.env` files used only to derive safe variable names; their values are not included.
- PostgreSQL schema-only dump and explicit database audit outputs (extensions, RLS, indexes, constraints, event triggers).
- Supabase `versions.md`.
- Four workflow screenshots.
- Runtime version/digest outputs and exact n8n community-node versions supplied in the conversation.

## Sanitization operations

- `pinData` deleted.
- top-level n8n workflow ID/version/meta fields deleted.
- every node `credentials` mapping deleted.
- node `webhookId` fields deleted.
- all workflows set inactive.
- known admin emails, Drive root ID, internal dashboard URL, WhatsApp notification chat ID, n8n deployment URL, and JWT-like n8n API tokens replaced with environment expressions.
- no production `.env` file copied.
- database snapshot contains schema only, no table rows.

Run `python3 scripts/validate_repo.py` after any future update.
