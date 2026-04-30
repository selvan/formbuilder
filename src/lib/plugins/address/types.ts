import type { BaseFieldSpec } from '$lib/core';
export interface AddressFieldSpec extends BaseFieldSpec { type: 'address'; country: string; }