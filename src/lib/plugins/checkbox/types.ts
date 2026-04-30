import type { BaseFieldData, FieldLayout, Choice } from '$lib/core';
export interface CheckboxFieldData extends BaseFieldData { type: 'checkbox'; field_layout: FieldLayout; checkboxes: Choice[]; }