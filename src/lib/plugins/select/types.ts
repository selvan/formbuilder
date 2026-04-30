import type { BaseFieldData, FieldSize, Choice } from '$lib/core';
export interface SelectFieldData extends BaseFieldData { type: 'select'; field_size: FieldSize; options: Choice[]; }