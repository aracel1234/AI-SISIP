# Diagnose Error1

Source field: `text`

```text
="You are an n8n Senior Engineer.

CONTEXT:

Failed Node: {{ $node["Error Trigger"].json.workflow.name }}

Error: {{ $node["Error Trigger"].json.execution.error.message }}

Workflow JSON: {{ JSON.stringify($node["Get Workflow JSON"].json) }}

TASK:

Decide if this is a 'RETRY' (network/timeout) or a 'FIX' (logic/wrong param).

If 'FIX', identify the specific parameter name in the failed node that caused the error.

Provide the corrected value for that parameter.

Return the result in the structured format."
```
