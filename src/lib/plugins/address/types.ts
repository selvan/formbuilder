import type { BaseFieldData } from '$lib/core';
export interface AddressFieldData extends BaseFieldData { type: 'address'; country: string; }