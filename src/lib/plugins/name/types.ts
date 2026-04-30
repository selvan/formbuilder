import type { BaseFieldSpec, NameFormat } from '$lib/core';
export interface NameFieldSpec extends BaseFieldSpec { type: 'name'; name_format: NameFormat; }