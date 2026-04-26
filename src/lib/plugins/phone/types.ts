import type { BaseFieldData, PhoneFormat } from '$lib/types';
export interface PhoneFieldData extends BaseFieldData { type: 'phone'; phone_format: PhoneFormat; }