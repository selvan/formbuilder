import type { FieldSpecPlugin } from '$lib/core';
import Icon from './Icon.svelte';
import Input from './Input.svelte';
import Preview from './Preview.svelte';
import Settings from './Settings.svelte';
import type { RadioFieldSpec } from './types';

export const radioPlugin: FieldSpecPlugin<RadioFieldSpec> = {
	type: 'radio',
	widgetName: 'Multiple Choice',
	icon: Icon as any,
	preview: Preview as any,
	settings: Settings as any,
	inputField: Input as any,
	validateField: (data: RadioFieldSpec) => {
		const val = data.value?.toString().trim() || '';
		if (data.required && val === '') {
			data.error = 'This field is required. Please select a value.';
			return false;
		}
		return true;
	},
	fieldInstanceValue: (data: RadioFieldSpec) => {
		const val = data.value?.toString().trim() || '';
		if (val !== '') {
			const index = parseInt(val, 10);
			return data.radios[index]?.text || '';
		}
		return '';
	},
	defaultSpecData: () => ({
		type: 'radio',
		label_text: 'Multiple Choice',
		required: false,
		field_layout: 'one_column',
		radios: [
			{ text: 'Option 1', checked: false },
			{ text: 'Option 2', checked: false },
			{ text: 'Option 3', checked: false }
		]
	})
};
