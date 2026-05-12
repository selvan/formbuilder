import type { FieldSpecPlugin } from '$lib/core';
import Icon from './Icon.svelte';
import Instance from './Instance.svelte';
import Preview from './Preview.svelte';
import Settings from './Settings.svelte';
import type { TextareaFieldSpec } from './types';

export const textareaPlugin: FieldSpecPlugin<TextareaFieldSpec> = {
	type: 'textarea',
	widgetName: 'Paragraph Text',
	icon: Icon as any,
	preview: Preview as any,
	settings: Settings as any,
	instance: Instance as any,
	validateField: (data: TextareaFieldSpec) => {
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
	fieldInstanceValue: (data: TextareaFieldSpec) => {
		return (data.value || '').trim();
	},
	defaultSpecData: () => {
		// To be filled from old formBuilder
		return { type: 'textarea', label_text: 'Paragraph Text', required: false, field_size: 'medium', default_text: '', range_min: null, range_max: null, range_type: 'characters' } as any;
	}
};
