#!/usr/bin/env python3
import json,re,sys
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
errors=[]
# Validate workflow templates.
for p in sorted((ROOT/'workflows').glob('0*.json')):
    try: d=json.loads(p.read_text())
    except Exception as e: errors.append(f'{p}: invalid JSON: {e}'); continue
    if d.get('active') is not False: errors.append(f'{p}: must be inactive')
    if 'pinData' in d: errors.append(f'{p}: pinData must not be present')
    for k in ['id','versionId','meta']:
        if k in d: errors.append(f'{p}: top-level {k} must be removed')
    for n in d.get('nodes',[]):
        if n.get('credentials'): errors.append(f"{p}: credential reference remains in node {n.get('name')}")
        if 'webhookId' in n: errors.append(f"{p}: webhookId remains in node {n.get('name')}")
# Scan text-like repository files for obvious real-secret indicators.
secret_res=[
 ('JWT',re.compile(r'eyJ[A-Za-z0-9_-]{20,}\.[A-Za-z0-9_-]{20,}\.[A-Za-z0-9_-]{10,}')),
 ('private-ip-url',re.compile(r'https?://(?:10\.|192\.168\.|172\.(?:1[6-9]|2\d|3[01])\.)')),
]
for p in ROOT.rglob('*'):
    if not p.is_file() or p.suffix.lower() in {'.png','.jpg','.jpeg','.zip'}: continue
    # skip schema snapshot for generic long SQL literals; there should still be no JWT/private URLs.
    try: s=p.read_text(errors='ignore')
    except: continue
    for name,rx in secret_res:
        if rx.search(s): errors.append(f'{p}: possible {name}')
# Ensure no production env file was generated.
for p in ROOT.rglob('.env'):
    errors.append(f'{p}: real .env must not be packaged')
if errors:
    print('VALIDATION FAILED')
    for e in errors: print(' -',e)
    sys.exit(1)
print('Validation OK: workflow JSON/sanitization checks passed.')
