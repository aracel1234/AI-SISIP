# Testing Results Reproduced from the PKL Report

This repository does not invent new evaluation measurements. Files under `tests/` reproduce the supplied report tables in machine-readable form.

## Test environment stated in the report

- Date: 12 July 2026.
- Environment: staging/local host described as functionally identical to production.
- Four main workflows active.
- WAHA status WORKING.
- 108 PDF/spreadsheet test documents.
- The report contains a specific backup WhatsApp test number; the public repository intentionally redacts that identifier.

## Functional test

Twelve functional cases in `functional-test-cases.csv` all have status `Berhasil`, covering narrative/statistical questions, greetings, out-of-scope routing, and message-age behavior around the 120-second threshold.

## Intent classification

`intent-classification-cases.csv` reproduces 40 cases. The confusion matrix in `intent-confusion-matrix.csv` gives 38 correct classifications and 2 Narrative questions classified as Out-of-Scope, for 95% accuracy.

## Retrieval

`retrieval-precision.csv` reproduces nine retrieval questions with the variable K values shown in Table 6.10 and an overall reported average of 80.87%.

**Source inconsistency preserved:** the narrative immediately below the table states “9 pertanyaan × K=5” while the table itself uses K values 15, 10, 10, 20, 25, 20, 35, 30, and 30 (total 195). The repository keeps the table values and does not silently rewrite the report wording.

## Workflow duration

`workflow-latency.csv` reproduces the 40 durations in Table 6.11. Table 6.12 reports averages Narrative 21.52s, Statistical 8.49s, General 4.06s, Out-of-Scope 4.06s, overall 9.53s.

The report labels the N-01…N-10 group “Narrative” even though many question texts are numerical/statistical in phrasing; the repository preserves the report label rather than reclassifying the rows.

## Workflow reliability

The report states 111 recorded workflow executions and all 111 completed with success status, yielding 100% observed success for that test period.
