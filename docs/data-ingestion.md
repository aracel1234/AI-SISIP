# Data Ingestion and Knowledge Sources

The repository intentionally contains no production knowledge documents or participant data.

## Expected Drive organization

Set `GOOGLE_DRIVE_FOLDER_ID` to the folder ID of your own Drive root used for AI SISIP. The final supplied workflows searched a root named `AI SISIP` and a `Trash` subfolder. The public templates replace the original folder ID with an environment expression.

## Supported source formats from the report/workflow

- Word / DOCX
- Google Docs
- PDF
- CSV
- Excel / XLSX
- Google Sheets
- OpenDocument Spreadsheet / ODS

## Processing model

Text-like documents are extracted, cleaned, change-detected by SHA-256, labelled, chunked with a recursive text splitter, embedded through the HuggingFace Inference embedding node, and written to `documents` with metadata.

Tabular sources are extracted and cleaned, labelled by the AI labelling step, and transformed into dynamic `data_*` or `ref_*` tables. The generated tables include `record_manager_id` so rows can be tied back to the source metadata record and removed with the data lifecycle.

## Adding sample data safely

Use your own public, synthetic, or explicitly authorized sample files. Do not publish Ministry-internal documents, participant records, private spreadsheets, or production Drive identifiers merely to demonstrate the workflow.
