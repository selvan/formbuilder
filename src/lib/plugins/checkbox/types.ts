import type { BaseFieldSpec, FieldLayout, Choice } from '$lib/core';
export interface CheckboxFieldSpec extends BaseFieldSpec { type: 'checkbox'; field_layout: FieldLayout; checkboxes: Choice[]; }