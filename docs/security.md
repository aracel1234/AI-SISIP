# Security Notes

This document complements the root `SECURITY.md` with implementation-specific observations.

- The public workflow exports have no `pinData`, n8n credential objects, workflow/instance IDs, or known hardcoded production API tokens.
- The original n8n/WAHA/Supabase `.env` files are **not included**.
- `n8n_data`, WAHA sessions/media, Supabase Postgres data, Storage files, SQL snippets, logs, and backups are ignored by Git.
- The public workflow templates are inactive.
- The Self-Healing workflow is especially privileged because it can call the n8n API and patch workflows.
- The SQL Agent tool description includes SELECT-only/LIMIT safeguards; database least privilege is still recommended as an additional hardening measure.
- RLS is automatically enabled for newly created public tables via the audited `ensure_rls` event trigger, but RLS alone does not define who may access a table; review policies/roles for your deployment.
