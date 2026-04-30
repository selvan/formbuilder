import type { BaseFieldData, NameFormat } from '$lib/core';
export interface NameFieldData extends BaseFieldData { type: 'name'; name_format: NameFormat; }