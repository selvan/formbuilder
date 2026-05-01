import type { BaseFieldSpec } from '$lib/core';
export interface FileFieldSpec extends BaseFieldSpec { type: 'file'; file?: File | null; }