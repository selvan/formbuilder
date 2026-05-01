import type { FieldPlugin } from '$lib/core';
import Icon from './Icon.svelte';
import Instance from './Instance.svelte';
import Preview from './Preview.svelte';
import Settings from './Settings.svelte';
import type { EmailFieldSpec } from './types';

export const emailPlugin: FieldPlugin<EmailFieldSpec> = {
	type: 'email',
	widgetName: 'Email',
	icon: Icon as any,
	preview: Preview as any,
	settings: Settings as any,
	instance: Instance as any,
	validateField: (data: EmailFieldSpec) => {
		const val = (data.value || '').trim();
		if (data.required && val === '') {
			data.error = 'This field is required. Please enter a value.';
			return false;
		}

		if (val !== '' && !/.+@.+\..+/.test(val)) {
			data.error = 'Invalid email. Please enter a valid email.';
			return false;
		}
		return true;
	},
	fieldInstanceValue: (data: EmailFieldSpec) => {
		return (data.value || '').trim();
	},
	defaultSpecData: () => {
		// To be filled from old formBuilder
		return { type: 'email', label_text: 'Email', required: false, field_size: 'medium', default_text: '' } as any;
	}
};
