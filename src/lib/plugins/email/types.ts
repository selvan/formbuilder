import type { BaseFieldSpec, FieldSize } from '$lib/core';
export interface EmailFieldSpec extends BaseFieldSpec { type: 'email'; default_text: string; field_size: FieldSize; value?: string; }