# Find Dataset

Source field: `toolDescription`

```text
=Find the most relevant dataset from record_manager based on the user question.

Returns a single row with:
- table_name : string (physical table name in database)
- column_names : JSON array, e.g. ["provinsi", "tahun", "jumlah_peserta"]
- data_type : 'tabular' or 'text'

IMPORTANT:
- You MUST parse column_names as a JSON array.
- Use those column names EXACTLY in your SQL query (case-sensitive, as returned).
- Never assume a column exists unless it appears in column_names.

Example:
If column_names = ["provinsi", "tahun", "jumlah_peserta"], your SQL must use "provinsi", not "Provinsi" or "province".
```
