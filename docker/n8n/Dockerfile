# Exact image digest observed from the supplied n8n 2.6.3 runtime.
ARG N8N_IMAGE=n8nio/n8n@sha256:a9beb0dcaa547f0742a322f497af72127338d6ab8f3697b3be44f8ab737726f2
FROM ${N8N_IMAGE}

LABEL org.opencontainers.image.title="AI SISIP n8n"
LABEL org.opencontainers.image.version="2.6.3"
LABEL org.opencontainers.image.description="n8n 2.6.3 with the community nodes used by AI SISIP"

USER root
RUN mkdir -p /home/node/.n8n/nodes && chown -R node:node /home/node/.n8n
USER node
WORKDIR /home/node/.n8n/nodes
RUN npm init -y >/dev/null 2>&1  && npm install --omit=dev --no-audit --no-fund       n8n-nodes-deepseek-reasoner@0.10.34       n8n-nodes-deepseek@1.0.6       n8n-nodes-waha@2024.11.5
WORKDIR /home/node
