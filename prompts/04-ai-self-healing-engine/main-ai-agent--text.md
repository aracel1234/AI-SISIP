# Main AI Agent

Source field: `text`

```text
=User Session : {{ $('Extract Sender Information').item.json.sender_number }}

Detected Question Category: {{ $json.output.categories.join(", ") }}

User Question:
{{ $('Extract Sender Information').item.json.message }}
```
