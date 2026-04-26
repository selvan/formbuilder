import type { BaseFieldData, FieldSize } from '$lib/types';
export interface EmailFieldData extends BaseFieldData { type: 'email'; default_text: string; field_size: FieldSize; }