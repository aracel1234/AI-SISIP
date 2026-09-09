# Original Deployment Snapshots

The small n8n and WAHA Compose files supplied from the duplicated server are retained under `infrastructure/original-reference/` for provenance. They contain no `.env` values.

- The original n8n Compose used `n8nio/n8n:latest`, mapped port 5678, mounted `./n8n-data:/home/node/.n8n`, and joined the external `shared-net` network. The running container was separately confirmed as n8n 2.6.3.
- The original WAHA Compose used `devlikeapro/waha`, port 3000, bind mounts for `sessions` and `media`, an `.env` file, and the external `shared-net` network. The running runtime was separately identified as WAHA 2026.8.2 CORE / WEBJS.

The root public-reference `docker-compose.yml` intentionally uses named volumes and observed image/version information to reduce accidental publication of runtime data and version drift. This is a repository hardening change, not a claim that the original server used those exact public-reference settings.
