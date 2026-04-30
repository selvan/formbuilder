import type { BaseFieldSpec, FieldSize } from '$lib/core';
export interface WebsiteFieldSpec extends BaseFieldSpec { type: 'website'; default_text: string; field_size: FieldSize; }