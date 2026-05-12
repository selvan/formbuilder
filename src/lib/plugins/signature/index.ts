import type { FieldSpecPlugin } from '$lib/core';
import Icon from './Icon.svelte';
import Instance from './Instance.svelte';
import Preview from './Preview.svelte';
import Settings from './Settings.svelte';
import type { SignatureFieldSpec } from './types';

export const signaturePlugin: FieldSpecPlugin<SignatureFieldSpec> = {
	type: 'signature',
	widgetName: 'Signature',
	icon: Icon as any,
	preview: Preview as any,
	settings: Settings as any,
	inputField: Instance as any,
	validateField: (data: SignatureFieldSpec) => {
		const val = data.value?.toString().trim() || '';
		if (data.required && (val === '' || val === '[]')) {
			data.error = 'This field is required. Please enter a value.';
			return false;
		}
		return true;
	},
	fieldInstanceValue: (data: SignatureFieldSpec) => {
		return data.value?.toString().trim() || '';
	},
	defaultSpecData: () => {
		// To be filled from old formBuilder
		return { type: 'signature', label_text: 'Signature', required: false } as any;
	}
};
