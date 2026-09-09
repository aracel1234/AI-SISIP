# Security Policy

## Public-repository safety model

The workflow templates are sanitized and inactive by default. Credential objects, pinned execution data, instance/workflow IDs, known administrator contact values, private/internal URLs, Google Drive root identifiers, WhatsApp notification identifiers, and hardcoded n8n API tokens were removed or replaced with environment expressions.

## Rotate previously exposed credentials

Before publishing or deploying, rotate all credentials previously used during development, including credentials for n8n, WAHA, Supabase, PostgreSQL, Google OAuth, DeepSeek, HuggingFace, and other integrated services.

## Never commit

- `.env` files with real values
- n8n data/credential databases
- WAHA sessions or media
- Supabase `volumes/db/data/` or storage data
- database dumps containing rows
- production execution logs
- Google Drive source documents unless explicitly authorized
- OAuth tokens, API keys, service-role keys, passwords, private certificates

## Self-Healing warning

The Self-Healing workflow can call the n8n API and, on its FIX branch, update workflow configuration. Leave it inactive until its API key, scope, target workflow list, error routing, and backup/recovery process have been reviewed. A manual approval gate is recommended for production hardening even though the supplied workflow implements automatic FIX/RETRY/SKIP behavior.

## Reporting a security issue

Do not post secrets in a public GitHub issue. Use GitHub private security reporting/advisories if enabled for the repository, or contact the repository owner through a private channel.
