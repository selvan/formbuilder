import type { BaseFieldSpec, FieldLayout, Choice } from '$lib/core';
export interface RadioFieldSpec extends BaseFieldSpec { type: 'radio'; field_layout: FieldLayout; radios: Choice[]; }