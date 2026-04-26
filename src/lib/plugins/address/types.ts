import type { BaseFieldData } from '$lib/types';
export interface AddressFieldData extends BaseFieldData { type: 'address'; country: string; }