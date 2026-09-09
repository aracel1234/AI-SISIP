# Run SQL Query

Source field: `toolDescription`

```text
=Find the most relevant dataset in record_manager for the user question. Execute a SQL query on the previously selected dataset table.

Returns:

* table_name
* column_names
* data_type

RULES:
- Only run SELECT queries. Never DELETE, DROP, UPDATE, INSERT.
- Always add LIMIT 50 to avoid huge results.
- Do not query system tables (pg_catalog, information_schema).
- If query fails (error column does not exist), do not retry.

Error will be returned as text. You must handle it by stating data is unavailable.

```
