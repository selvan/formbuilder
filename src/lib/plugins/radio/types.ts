import type { BaseFieldData, FieldLayout, Choice } from '$lib/types';
export interface RadioFieldData extends BaseFieldData { type: 'radio'; field_layout: FieldLayout; radios: Choice[]; }