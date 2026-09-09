# Required Supabase Vendor Assets

The supplied production-derived `docker-compose.yml` is preserved here, but it references files that belong to the upstream self-hosted Supabase Docker distribution. They were not provided as conversation attachments and are not fabricated in this repository.

Before starting Supabase, provide these paths from a self-hosted Supabase Docker checkout compatible with the image versions listed in `versions.md`:

- `volumes/api/kong.yml`
- `volumes/db/realtime.sql`
- `volumes/db/webhooks.sql`
- `volumes/db/roles.sql`
- `volumes/db/jwt.sql`
- `volumes/db/_supabase.sql`
- `volumes/db/logs.sql`
- `volumes/db/pooler.sql`
- `volumes/functions/main/index.ts`
- `volumes/logs/vector.yml`
- `volumes/pooler/pooler.exs`
- writable runtime directories `volumes/db/data/`, `volumes/storage/`, and `volumes/snippets/`

Do **not** copy an existing production `volumes/db/data/`, Storage data, SQL snippets, or secrets into a public repository.

For the original duplicated server, these vendor assets already existed under `Supabase-Server/supabase-project/volumes/`. For a fresh public deployment, obtain a matching official self-hosted Supabase Docker distribution, then apply the AI SISIP migrations from `../../database/migrations/`.
