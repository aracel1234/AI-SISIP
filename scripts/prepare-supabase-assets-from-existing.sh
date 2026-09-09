#!/usr/bin/env sh
set -eu
if [ "$#" -ne 1 ]; then
  echo "Usage: $0 /path/to/existing/supabase-project" >&2
  exit 2
fi
SRC=$1
DST=$(CDPATH= cd -- "$(dirname -- "$0")/../infrastructure/supabase" && pwd)
for f in   volumes/api/kong.yml   volumes/db/realtime.sql volumes/db/webhooks.sql volumes/db/roles.sql volumes/db/jwt.sql   volumes/db/_supabase.sql volumes/db/logs.sql volumes/db/pooler.sql   volumes/functions/main/index.ts volumes/logs/vector.yml volumes/pooler/pooler.exs
do
  if [ ! -f "$SRC/$f" ]; then echo "Missing source asset: $SRC/$f" >&2; exit 1; fi
  mkdir -p "$DST/$(dirname "$f")"
  cp "$SRC/$f" "$DST/$f"
done
mkdir -p "$DST/volumes/db/data" "$DST/volumes/storage" "$DST/volumes/snippets"
echo "Copied upstream Supabase vendor assets. Runtime data was not copied."
