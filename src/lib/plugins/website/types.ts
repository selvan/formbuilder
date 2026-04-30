import type { BaseFieldData, FieldSize } from '$lib/core';
export interface WebsiteFieldData extends BaseFieldData { type: 'website'; default_text: string; field_size: FieldSize; }