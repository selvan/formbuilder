import type { BaseFieldData, FieldLayout, Choice } from '$lib/core';
export interface RadioFieldData extends BaseFieldData { type: 'radio'; field_layout: FieldLayout; radios: Choice[]; }