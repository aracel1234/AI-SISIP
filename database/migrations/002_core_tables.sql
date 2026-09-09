-- Core AI SISIP tables reconstructed from the supplied schema-only dump.
-- Dynamic data_* and ref_* knowledge tables are intentionally NOT pre-created here;
-- the Data Ingestion Pipeline creates them from incoming tabular datasets.

CREATE TABLE IF NOT EXISTS public.record_manager (
    id BIGSERIAL PRIMARY KEY,
    source_id TEXT NOT NULL UNIQUE,
    file_name TEXT NOT NULL,
    source_folder TEXT NOT NULL DEFAULT 'unknown',
    data_type TEXT NOT NULL CHECK (data_type IN ('text','tabular')),
    column_names TEXT,
    content_hash TEXT NOT NULL,
    category TEXT,
    file_summary TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    table_name TEXT,
    "Confidence" TEXT
);

CREATE TABLE IF NOT EXISTS public.documents (
    id BIGSERIAL PRIMARY KEY,
    record_manager_id TEXT,
    content TEXT,
    embedding public.vector(768),
    metadata JSONB,
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.ref_data (
    id TEXT PRIMARY KEY,
    nama TEXT,
    path TEXT,
    jenis TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.ref_file (
    id TEXT PRIMARY KEY,
    nama TEXT,
    path TEXT,
    jenis TEXT
);

CREATE TABLE IF NOT EXISTS public.ref_trash (
    id TEXT PRIMARY KEY,
    nama TEXT,
    path TEXT,
    jenis TEXT
);
