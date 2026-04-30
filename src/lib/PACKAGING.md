# Package Boundary

The library is organized so it can be extracted into npm packages later without reshaping the app again.

## Suggested Packages

`@kanbanerp/formbuilder-core`

- `src/lib/core`
- Shared field data types
- `FieldPlugin` contract
- `PluginRegistry`

`@kanbanerp/formbuilder-fields`

- `src/lib/plugins`
- Default field plugins
- Shared plugin setting controls
- `defaultPlugins`

`@kanbanerp/formbuilder-svelte`

- `src/lib/components`
- Builder and instance UI components
- Depends on core and fields

## Current Local Imports

Use these imports inside the app:

```ts
import type { FieldSpec, FieldPlugin } from '$lib/core';
import { fieldRegistry } from '$lib/core';
import { defaultPlugins } from '$lib/plugins';
import { FormBuilder, DocumentInstance } from '$lib';
```

The older `$lib/types` and `$lib/stores/registry.svelte` modules remain as compatibility shims.
