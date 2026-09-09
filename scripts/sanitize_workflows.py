#!/usr/bin/env python3
"""Sanitize future n8n exports before committing them to a public repository.

This generic helper removes pinning/instance metadata, credentials, webhook IDs, forces inactive state,
and scrubs obvious JWT-like values/private-IP URLs. Environment-specific identifiers that are not
recognizable by regex should be supplied through --replace OLD=NEW.
"""
import argparse, json, re
from pathlib import Path
JWT=re.compile(r'eyJ[A-Za-z0-9_-]{20,}\.[A-Za-z0-9_-]{20,}\.[A-Za-z0-9_-]{10,}')
PRIV=re.compile(r'https?://(?:10\.|192\.168\.|172\.(?:1[6-9]|2\d|3[01])\.)[^\s"\'<>]+')

def walk(x,repl):
    if isinstance(x,str):
        for a,b in repl.items(): x=x.replace(a,b)
        x=JWT.sub('{{$env.REDACTED_API_KEY}}',x)
        x=PRIV.sub('{{$env.INTERNAL_SERVICE_URL}}',x)
        return x
    if isinstance(x,list): return [walk(v,repl) for v in x]
    if isinstance(x,dict): return {k:walk(v,repl) for k,v in x.items()}
    return x

ap=argparse.ArgumentParser()
ap.add_argument('input',type=Path)
ap.add_argument('output',type=Path)
ap.add_argument('--replace',action='append',default=[],metavar='OLD=NEW')
a=ap.parse_args()
repl={}
for item in a.replace:
    old,sep,new=item.partition('=')
    if not sep: ap.error('--replace requires OLD=NEW')
    repl[old]=new

d=walk(json.loads(a.input.read_text()),repl)
for k in ['pinData','versionId','meta','id','staticData','triggerCount','versionCounter']: d.pop(k,None)
d['active']=False; d['tags']=[]
for n in d.get('nodes',[]):
    n.pop('credentials',None); n.pop('webhookId',None)
a.output.parent.mkdir(parents=True,exist_ok=True)
a.output.write_text(json.dumps(d,ensure_ascii=False,indent=2)+'\n')
