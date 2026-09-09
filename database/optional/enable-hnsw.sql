-- OPTIONAL REFERENCE ENHANCEMENT — NOT PRESENT IN THE AUDITED PRODUCTION-DERIVED SCHEMA.
-- Use only after validating memory/performance trade-offs for your knowledge-base size.
CREATE INDEX IF NOT EXISTS documents_embedding_hnsw_idx
ON public.documents
USING hnsw (embedding vector_cosine_ops);

ANALYZE public.documents;
