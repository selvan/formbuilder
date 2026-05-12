import type { FieldSpecPlugin } from '$lib/core';
import Icon from './Icon.svelte';
import Instance from './Instance.svelte';
import Preview from './Preview.svelte';
import Settings from './Settings.svelte';
import type { TextFieldSpec } from './types';

export const textPlugin: FieldSpecPlugin<TextFieldSpec> = {
	type: 'text',
	widgetName: 'Single Line Text',
	icon: Icon as any,
	preview: Preview as any,
	settings: Settings as any,
	inputField: Instance as any,
	validateField: (data: TextFieldSpec) => {
		const val = (data.value || '').trim();
		if (data.required && val === '') {
			data.error = 'This field is required. Please enter a value.';
			return false;
		}

		if (val === '') return true;

		const min = data.range_min || 0;
		const max = data.range_max || 0;
		const length =
			data.range_type === 'characters' ? val.length : val.split(/\s+/).filter(Boolean).length;

		if (max > 0 && length > max) {
			data.error = `This field can have ${max} ${data.range_type} atmost`;
			return false;
		}

		if (min > 0 && length < min) {
			data.error = `This field must have ${min} ${data.range_type} atleast`;
			return false;
		}

		return true;
	},
	fieldInstanceValue: (data: TextFieldSpec) => {
		return (data.value || '').trim();
	},
	defaultSpecData: () => {
		// To be filled from old formBuilder
		return { type: 'text', label_text: 'Single Line Text', required: false, field_size: 'medium', default_text: '', range_min: null, range_max: null, range_type: 'characters' } as any;
	}
};
