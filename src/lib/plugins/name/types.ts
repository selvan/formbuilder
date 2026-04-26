import type { BaseFieldData, NameFormat } from '$lib/types';
export interface NameFieldData extends BaseFieldData { type: 'name'; name_format: NameFormat; }