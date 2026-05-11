---
name: text-field-plugin
description: Use when a CLI agent composes, validates, or extracts field values for the formbuilder `text` field plugin; ignore Svelte UI files and follow `index.ts`/`types.ts`.
metadata:
  when_to_use:
    - "The task involves a field with `type: 'text'`."
    - "The agent needs defaults for creating a new single-line text field."
    - "The agent needs to validate required text or min/max length with `validateField`."
    - "The agent needs the trimmed string returned by `fieldInstanceValue`."
  how_to_use:
    - "Compose new fields from `defaultSpecData` and do not supply `id`."
    - "Preserve `id` only when editing an already persisted field."
    - "Validate submitted text from trimmed `value`, not from `default_text`."
    - "Skip length validation when the value is empty and the field is optional."
    - "Count either characters or words based on `range_type`, applying `range_max` before `range_min`."
    - "Return the submitted `value` as a trimmed string."
  ignore:
    - Instance.svelte
    - Preview.svelte
    - Settings.svelte
---

# Text Field Plugin Skill

Use this skill when a CLI agent needs to compose, validate, or extract the submitted value for the `text` field plugin.

This skill is for CLI-facing behavior only. Ignore design/runtime Svelte elements in this directory, including `Instance.svelte`, `Preview.svelte`, and `Settings.svelte`. The relevant implementation files are:

- `index.ts`
- `types.ts`

## Field Shape

The text field spec is `TextFieldSpec`:

```ts
interface TextFieldSpec extends BaseFieldSpec {
	type: 'text';
	default_text: string;
	field_size: 'small' | 'medium' | 'large';
	range_min: number | null;
	range_max: number | null;
	range_type: 'characters' | 'words';
	value?: string;
}
```

`BaseFieldSpec` also provides common field properties such as `id`, `label_text`, `required`, and optional `error`.

## Compose Defaults

When composing a new text field, use the plugin default shape:

```ts
{
	type: 'text',
	label_text: 'Single Line Text',
	required: false,
	field_size: 'medium',
	default_text: '',
	range_min: null,
	range_max: null,
	range_type: 'characters'
}
```

Do not supply `id` when composing a new field. `id` exists only for persisted fields, so agents should preserve an existing `id` when editing a persisted field but omit it for newly composed fields.

Use `field_size` only as field metadata. It does not affect CLI validation or value extraction.

## validateField

Use the plugin's `validateField(data: TextFieldSpec)` behavior when validating a submitted text field. `validateField` mutates `data.error` when invalid and returns `false`. It returns `true` when valid.

Normalize the submitted value before validation:

```ts
const val = (data.value || '').trim();
```

Required fields:

- If `required` is `true` and `val` is empty, validation fails.
- Use this error message:

```ts
data.error = 'This field is required. Please enter a value.';
```

Optional empty fields:

- If `val` is empty and the field is not required, validation passes.
- Range checks are skipped for empty optional values.

After required checks, `validateField` validates length as follows:

- Treat `range_min` and `range_max` as disabled when they are `null`, `undefined`, or `0`.
- For `range_type: 'characters'`, count `val.length`.
- For `range_type: 'words'`, count `val.split(/\s+/).filter(Boolean).length`.
- Apply `range_max` before `range_min`.

If the value is longer than `range_max`, validation fails with:

```ts
data.error = `This field can have ${max} ${data.range_type} atmost`;
```

If the value is shorter than `range_min`, validation fails with:

```ts
data.error = `This field must have ${min} ${data.range_type} atleast`;
```

## fieldInstanceValue

`fieldInstanceValue(data: TextFieldSpec)` returns the submitted value as a trimmed string:

```ts
return (data.value || '').trim();
```

The returned value is always a string. Missing values, whitespace-only values, and empty values return `''`.

## CLI Implementation Notes

- Preserve the plugin type as `text`.
- Do not depend on Svelte components or UI-only settings when implementing CLI behavior.
- Do not use `default_text` as the submitted value unless the caller explicitly asks to prefill `value`; validation and `fieldInstanceValue` read from `value`.
- Match the existing plugin behavior in `index.ts` if code and this skill diverge.
