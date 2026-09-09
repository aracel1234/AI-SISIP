# AI Self-Healing Engine

The supplied final Self-Healing workflow is a centralized n8n error workflow.

## Common error intake

`Error Trigger` receives failure metadata. The workflow ignores errors originating from itself, filters duplicate incidents, extracts workflow/node/error/stack details, and branches by workflow type.

## AI Agent retry / skip path

For chatbot errors, the workflow obtains the failed workflow definition, uses DeepSeek-based diagnosis, chooses retry or skip, waits when appropriate, and can reprocess the last message through the question categorizer + Main AI Agent. Skipped incidents are notified to the administrator.

## Ingestion / deletion FIX, RETRY, SKIP

For ingestion/deletion errors, the AI diagnosis can choose:

- `FIX`: generate a parameter patch, update the target workflow through the n8n API, then retry.
- `RETRY`: wait/cool down, then retry the execution.
- `SKIP`: record/notify and leave the incident for manual review.

## Public-repository protection

The supplied export contained environment-specific n8n URLs, administrator contacts, notification chat IDs, pinned test error payloads, and hardcoded n8n API tokens. The public workflow removes/replaces them and remains inactive by default. Configure `$env.N8N_BASE_URL`, `$env.N8N_API_KEY`, `$env.ADMIN_EMAIL`, and `$env.WHATSAPP_NOTIFICATION_CHAT_ID` before testing.
