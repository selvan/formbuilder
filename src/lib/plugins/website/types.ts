import type { BaseFieldData, FieldSize } from '$lib/types';
export interface WebsiteFieldData extends BaseFieldData { type: 'website'; default_text: string; field_size: FieldSize; }