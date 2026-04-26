import type { BaseFieldData, FieldSize, Choice } from '$lib/types';
export interface SelectFieldData extends BaseFieldData { type: 'select'; field_size: FieldSize; options: Choice[]; }