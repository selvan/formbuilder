import type { BaseFieldData, PhoneFormat } from '$lib/core';
export interface PhoneFieldData extends BaseFieldData { type: 'phone'; phone_format: PhoneFormat; }