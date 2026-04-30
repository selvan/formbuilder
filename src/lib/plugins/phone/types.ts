import type { BaseFieldSpec, PhoneFormat } from '$lib/core';
export interface PhoneFieldSpec extends BaseFieldSpec { type: 'phone'; phone_format: PhoneFormat; }