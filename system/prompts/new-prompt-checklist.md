# New Prompt Creation Checklist

This checklist ensures that any newly authored prompt aligns with Intent Trader standards.

---

## Metadata
- [ ] `id` is unique and descriptive
- [ ] `version` follows semantic versioning
- [ ] `created` and `updated` timestamps in ISO format
- [ ] `type` is one of: prompt | reference | system | blueprint | cognitive
- [ ] `cognitiveLoad` is assigned realistically
- [ ] `requiresConfirmation` is true if prompt affects session state or trades

---

## Structure
- [ ] Inputs clearly listed
- [ ] Output format specified using valid JSON
- [ ] Includes test vector and expected output
- [ ] References relevant schema and blueprint files

---

## Validation
- [ ] Prompt is validated against `metadata.schema.json`
- [ ] File is discoverable by `registry.js`
- [ ] File is indexed in `prompt-registry.json` if deployed

---

## Testing
- [ ] Manual test using sample inputs
- [ ] Used in simulated prompt flow or replay engine

---

Use the scaffold at: `system/templates/prompt-scaffold.md`
