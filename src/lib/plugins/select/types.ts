import type { BaseFieldSpec, FieldSize, Choice } from '$lib/core';
export interface SelectFieldSpec extends BaseFieldSpec { type: 'select'; field_size: FieldSize; options: Choice[]; }