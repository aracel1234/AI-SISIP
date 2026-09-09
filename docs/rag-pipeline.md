# RAG and Query Routing

AI SISIP uses two complementary retrieval paths.

## Narrative / qualitative path

The Main AI Agent can call `Search SISIP Knowledge`, a Supabase vector-store tool backed by the `documents` table. Text documents are chunked and embedded during ingestion through the HuggingFace Inference embedding node. The audited database column is `vector(768)`.

The exported HuggingFace embedding nodes contain only `options: {}`; the exact embedding model is therefore not encoded in the workflow JSON and depends on the configured n8n credential/provider. This repository does not invent a model name.

## Statistical / tabular path

`Find Dataset` reads metadata from `record_manager`, including `table_name`, `column_names`, and `data_type`. `Run SQL Query` executes the query selected by the agent. The tool description in the supplied workflow instructs the agent to use SELECT-only queries, add `LIMIT 50`, avoid system tables, and stop rather than blindly retry on missing-column errors.

For production hardening, complement prompt/tool instructions with database-level least-privilege credentials; the public repository does not claim that a read-only PostgreSQL role was present in the supplied runtime.
