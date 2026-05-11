# Name Field Plugin Skill

Use this skill when a CLI agent needs to compose, validate, or extract the submitted value for the `name` field plugin.

This skill is for CLI-facing behavior only. Ignore design/runtime Svelte elements in this directory, including `Instance.svelte`, `Preview.svelte`, and `Settings.svelte`. The relevant implementation files are:

- `index.ts`
- `types.ts`

## Field Shape

The name field spec is `NameFieldSpec`:

```ts
interface NameFieldSpec extends BaseFieldSpec {
	type: 'name';
	name_format: 'simple' | 'extended';
	first?: string;
	last?: string;
	title?: string;
	suffix?: string;
}
```

`BaseFieldSpec` also provides common field properties such as `id`, `label_text`, `required`, and optional `error`.

## Compose Defaults

When composing a new name field, use the plugin default shape:

```ts
{
	type: 'name',
	label_text: 'Name',
	required: false,
	name_format: 'simple'
}
```

Do not supply `id` when composing a new field. `id` exists only for persisted fields, so agents should preserve an existing `id` when editing a persisted field but omit it for newly composed fields.

Use `name_format: 'simple'` for first and last name only. Use `name_format: 'extended'` when the field should include title, first name, last name, and suffix.

## validateField

Use the plugin's `validateField(data: NameFieldSpec)` behavior when validating a submitted name field. `validateField` mutates `data.error` when invalid and returns `false`. It returns `true` when valid.

Required simple names:

- `first` must be present after trimming.
- `last` must be present after trimming.

Required extended names:

- `first` must be present after trimming.
- `last` must be present after trimming.
- `title` must be present after trimming.
- `suffix` must be present after trimming.

Optional names:

- Empty values are valid when `required` is `false`.
- There is no extra format validation beyond required-part checks.

Use this error message for missing required name parts:

```ts
data.error = 'This field is required. Please enter a value.';
```

## Field Value

`fieldInstanceValue` returns a normalized object. Trim every string part and use an empty string for missing parts:

```ts
{
	first: data.first?.trim() || '',
	last: data.last?.trim() || '',
	title: data.title?.trim() || '',
	suffix: data.suffix?.trim() || '',
	name_format: data.name_format
}
```

The returned value is always an object, even for `simple` format. For `simple`, `title` and `suffix` are still included as empty strings unless supplied.

## CLI Implementation Notes

- Preserve the plugin type as `name`.
- Preserve `name_format` in the field value so downstream consumers can distinguish `simple` from `extended`.
- Do not depend on Svelte components or UI-only settings when implementing CLI behavior.
- Do not infer display formatting such as `"First Last"` unless a caller explicitly asks for presentation text; the canonical field value is the normalized object above.
- Match the existing plugin behavior in `index.ts` if code and this skill diverge.
