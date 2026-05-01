import type { FieldPlugin } from '$lib/core';
import Icon from './Icon.svelte';
import Instance from './Instance.svelte';
import Preview from './Preview.svelte';
import Settings from './Settings.svelte';
import type { NumberFieldSpec } from './types';

export const numberPlugin: FieldPlugin<NumberFieldSpec> = {
	type: 'number',
	widgetName: 'Number',
	icon: Icon as any,
	preview: Preview as any,
	settings: Settings as any,
	instance: Instance as any,
	validateField: (data: NumberFieldSpec) => {
		const val = (data.value || '').trim();

		if (data.required && val === '') {
			data.error = 'This field is required. Please enter a value.';
			return false;
		}

		if (!data.required && val === '') {
			return true;
		}

		// Check if it's a valid integer (including optional sign)
		if (!/^-?\d+$/.test(val)) {
			data.error = 'Invalid Number.';
			return false;
		}

		const numValue = parseInt(val, 10);
		const min = data.range_min || 0;
		const max = data.range_max || 0;
		const l = data.range_type === 'value' ? numValue : val.length;

		if (max > 0 && l > max) {
			data.error = `This field can have ${max} ${data.range_type} atmost`;
			return false;
		}

		if (min > 0 && l < min) {
			data.error = `This field must have ${min} ${data.range_type} atleast`;
			return false;
		}

		return true;
	},
	fieldInstanceValue: (data: NumberFieldSpec) => {
		const val = (data.value || '').trim();
		return val === '' ? null : parseInt(val, 10);
	},
	defaultSpecData: () => {
		// To be filled from old formBuilder
		return {
			type: 'number',
			label_text: 'Number',
			required: false,
			field_size: 'medium',
			range_min: null,
			range_max: null,
			range_type: 'value',
			default_text: ''
		} as any;
	}
};
