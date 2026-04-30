import type { BaseFieldData, FieldSize } from '$lib/core';
export interface EmailFieldData extends BaseFieldData { type: 'email'; default_text: string; field_size: FieldSize; }