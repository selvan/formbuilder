import type { BaseFieldData, DateFormat } from '$lib/core';
export interface DateFieldData extends BaseFieldData { type: 'date'; date_format: DateFormat; }