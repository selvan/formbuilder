import type { BaseFieldSpec, DateFormat } from '$lib/core';
export interface DateFieldSpec extends BaseFieldSpec { type: 'date'; date_format: DateFormat; mm?: string; dd?: string; yyyy?: string; }