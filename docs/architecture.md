# Architecture

AI SISIP is structured as four logical layers in the PKL report: interface, orchestration, intelligence, and data. WhatsApp communication is handled through WAHA; n8n orchestrates the workflows; DeepSeek is used for classification/reasoning/diagnosis; HuggingFace provides embedding through the n8n LangChain embedding node; and Supabase/PostgreSQL + pgVector stores metadata, tabular data, text chunks, and embeddings.

![Historical architecture figure from the report](images/architecture-report-figure-5-1.png)

The four workflow modules are intentionally modular: AI Agent Chatbot SISIP, Data Ingestion Pipeline, Data Deletion Pipeline, and AI Self-Healing Engine.

## Current supplied runtime topology

```mermaid
flowchart TB
    U[WhatsApp User] <--> W[WAHA 2026.8.2 CORE / WEBJS]
    W <--> N[n8n 2.6.3]
    N <--> D[DeepSeek]
    N <--> H[HuggingFace Embeddings]
    N <--> G[Google Drive / Docs / Sheets / Gmail]
    N <--> S[Supabase / PostgreSQL / pgVector]
    S --> RM[record_manager]
    S --> DOC[documents vector 768]
    S --> DYN[dynamic data_* / ref_* tables]
```

The historical figure labels WAHA as GOWS. The supplied current runtime explicitly identifies WAHA 2026.8.2 CORE using WEBJS; this repository runtime follows the supplied current environment. See `known-differences.md`.
