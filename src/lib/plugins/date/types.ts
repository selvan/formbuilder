import type { BaseFieldData, DateFormat } from '$lib/types';
export interface DateFieldData extends BaseFieldData { type: 'date'; date_format: DateFormat; }