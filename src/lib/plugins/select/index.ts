import type { FieldSpecPlugin } from '$lib/core';
import Icon from './Icon.svelte';
import Instance from './Instance.svelte';
import Preview from './Preview.svelte';
import Settings from './Settings.svelte';
import type { SelectFieldSpec } from './types';

export const selectPlugin: FieldSpecPlugin<SelectFieldSpec> = {
	type: 'select',
	widgetName: 'Dropdown',
	icon: Icon as any,
	preview: Preview as any,
	settings: Settings as any,
	instance: Instance as any,
	validateField: (data: SelectFieldSpec) => {
		const val = data.value?.toString().trim() || '';
		if (data.required && val === '') {
			data.error = 'This field is required. Please select a value.';
			return false;
		}
		return true;
	},
	fieldInstanceValue: (data: SelectFieldSpec) => {
		const val = data.value?.toString().trim() || '';
		if (val !== '') {
			const index = parseInt(val, 10);
			return data.options[index]?.text || '';
		}
		return '';
	},
	defaultSpecData: () => ({
		type: 'select',
		label_text: 'Dropdown',
		required: false,
		field_size: 'medium',
		options: [
			{ text: 'Option 1', checked: false },
			{ text: 'Option 2', checked: false },
			{ text: 'Option 3', checked: false }
		]
	})
};
