#!/usr/bin/env sh
set -eu
BASE=${1:-infrastructure/supabase}
required='volumes/api/kong.yml
volumes/db/realtime.sql
volumes/db/webhooks.sql
volumes/db/roles.sql
volumes/db/jwt.sql
volumes/db/_supabase.sql
volumes/db/logs.sql
volumes/db/pooler.sql
volumes/functions/main/index.ts
volumes/logs/vector.yml
volumes/pooler/pooler.exs'
missing=0
printf '%s
' "$required" | while IFS= read -r f; do
  [ -z "$f" ] && continue
  if [ ! -f "$BASE/$f" ]; then echo "MISSING: $BASE/$f" >&2; missing=1; fi
done
# POSIX pipeline subshells make propagating the flag awkward; re-check count.
count=0
for f in $required; do [ -f "$BASE/$f" ] || count=$((count+1)); done
if [ "$count" -gt 0 ]; then
  echo "$count required upstream Supabase asset(s) are missing." >&2
  exit 1
fi
echo "Supabase vendor assets present."
