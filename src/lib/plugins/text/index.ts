import type { FieldPlugin } from '$lib/core';
import Icon from './Icon.svelte';
import Instance from './Instance.svelte';
import Preview from './Preview.svelte';
import Settings from './Settings.svelte';
import type { TextFieldSpec } from './types';

export const textPlugin: FieldPlugin<TextFieldSpec> = {
	type: 'text',
	widgetName: 'Single Line Text',
	icon: Icon as any,
	preview: Preview as any,
	settings: Settings as any,
	instance: Instance as any,
	validateField: (fieldTemplate: TextFieldSpec, fieldParam?: String) => {
		const field = String(fieldParam || '').trim();

		if (fieldTemplate.required && field.length === 0) {
			fieldTemplate.error = "This field is required. Please enter a value.";
			return false;
		}

		const min = fieldTemplate.range_min || 0;
		const max = fieldTemplate.range_max || 0;

		let length = 0;
		if (fieldTemplate.range_type === 'characters') {
			length = field.length;
		} else {
			length = field.length === 0 ? 0 : field.split(/\s+/).length;
		}

		if (max > 0 && length > max) {
			fieldTemplate.error = `This field can have ${max} ${fieldTemplate.range_type} atmost`;
			return false;
		}

		if (min > 0 && length < min) {
			fieldTemplate.error = `This field must have ${min} ${fieldTemplate.range_type} atleast`;
			return false;
		}
		return true;
	},
	defaultSpecData: () => {
		// To be filled from old formBuilder
		return { type: 'text', label_text: 'Single Line Text', required: false } as any;
	}
};
