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
	validateField: (fieldSpec: TextFieldSpec, userFieldValue?: String) => {
		const _userFieldValue = String(userFieldValue || '').trim();

		if (fieldSpec.required && _userFieldValue.length === 0) {
			fieldSpec.error = "This field is required. Please enter a value.";
			return false;
		}

		const min = fieldSpec.range_min || 0;
		const max = fieldSpec.range_max || 0;

		let length = 0;
		if (fieldSpec.range_type === 'characters') {
			length = _userFieldValue.length;
		} else {
			length = _userFieldValue.length === 0 ? 0 : _userFieldValue.split(/\s+/).length;
		}

		if (max > 0 && length > max) {
			fieldSpec.error = `This field can have ${max} ${fieldSpec.range_type} atmost`;
			return false;
		}

		if (min > 0 && length < min) {
			fieldSpec.error = `This field must have ${min} ${fieldSpec.range_type} atleast`;
			return false;
		}
		return true;
	},
	defaultSpecData: () => {
		// To be filled from old formBuilder
		return { type: 'text', label_text: 'Single Line Text', required: false } as any;
	}
};
