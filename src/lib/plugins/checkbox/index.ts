import type { FieldPlugin } from '$lib/core';
import Icon from './Icon.svelte';
import Instance from './Instance.svelte';
import Preview from './Preview.svelte';
import Settings from './Settings.svelte';
import type { CheckboxFieldSpec } from './types';

export const checkboxPlugin: FieldPlugin<CheckboxFieldSpec> = {
	type: 'checkbox',
	widgetName: 'Checkboxes',
	icon: Icon as any,
	preview: Preview as any,
	settings: Settings as any,
	instance: Instance as any,
	defaultSpecData: () => ({
		type: 'checkbox',
		label_text: 'Checkboxes',
		required: false,
		field_layout: 'one_column',
		checkboxes: [
			{ text: 'Option 1', checked: false },
			{ text: 'Option 2', checked: false },
			{ text: 'Option 3', checked: false }
		]
	}),
	validateField: (data: CheckboxFieldSpec) => {
		if (data.required) {
			const hasSelection = data.checkboxes.some((_, i) => {
				const val = (data as any)[String(i)];
				return val !== undefined && val !== '-1';
			});
			if (!hasSelection) {
				data.error = 'This field is required. Please select a value.';
				return false;
			}
		}
		return true;
	},
	fieldInstanceValue: (data: CheckboxFieldSpec) => {
		return data.checkboxes
			.map((_, i) => (data as any)[String(i)])
			.filter((val) => val !== undefined && val !== '-1')
			.map((index) => data.checkboxes[Number(index)].text);
	},
};
