# n8n Credential Setup

The sanitized workflow templates intentionally contain **no n8n credential IDs or credential names**. Create credentials in your own n8n instance and assign them to the relevant nodes after import.

Credential types observed in the supplied final exports:

| n8n credential type | Used for |
|---|---|
| `wahaApi` | WAHA send/trigger nodes |
| `postgres` | SQL and Postgres Tool nodes |
| `supabaseApi` | Supabase row/vector operations |
| `deepSeekReasonerApi` | community DeepSeek Reasoner node |
| `deepSeekApi` | LangChain DeepSeek chat model node |
| `huggingFaceApi` | HuggingFace embedding node |
| `gmailOAuth2` | administrator email notifications |
| `googleDriveOAuth2Api` | Drive scanning/deletion |
| `googleDocsOAuth2Api` | Google Docs content extraction |
| `googleSheetsOAuth2Api` | Google Sheets data extraction |
| `n8nApi` | n8n API operation used by Self-Healing |

## Suggested internal endpoints on the shared network

- WAHA API: `http://waha:3000`
- Supabase gateway: `http://supabase-kong:8000` (or the `kong` service name in the supplied Compose network)
- PostgreSQL pooler: `supabase-pooler:6543`
- n8n API from the n8n container/workflow context: `http://n8n:5678`

Use your own API keys/OAuth client secrets. Environment values in `.env.example` are placeholders and do not automatically create n8n credentials.
