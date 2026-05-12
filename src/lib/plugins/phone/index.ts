import type { FieldSpecPlugin } from '$lib/core';
import Icon from './Icon.svelte';
import Instance from './Instance.svelte';
import Preview from './Preview.svelte';
import Settings from './Settings.svelte';
import type { PhoneFieldSpec } from './types';

export const phonePlugin: FieldSpecPlugin<PhoneFieldSpec> = {
	type: 'phone',
	widgetName: 'Phone',
	icon: Icon as any,
	preview: Preview as any,
	settings: Settings as any,
	instance: Instance as any,
	validateField: (data: PhoneFieldSpec) => {
		if (data.phone_format === 'international') {
			if (data.required && !data.international?.trim()) {
				data.error = 'This field is required. Please enter a value.';
				return false;
			}
		} else {
			const parts = ['first', 'second', 'third'] as const;
			if (data.required && parts.some((p) => !data[p]?.trim())) {
				data.error = 'This field is required. Please enter a value.';
				return false;
			}
			const filled = parts.some((p) => data[p]?.trim());
			const lengths = { first: 3, second: 3, third: 4 };
			if (filled && parts.some((p) => data[p]?.trim().length !== lengths[p])) {
				data.error = 'Invalid Phone number.';
				return false;
			}
		}
		return true;
	},
	fieldInstanceValue: (data: PhoneFieldSpec) => {
		if (data.phone_format === 'international') {
			return data.international?.trim() || '';
		} else {
			const parts = ['first', 'second', 'third'] as const;
			if (parts.every((p) => data[p]?.trim())) {
				return parts.map((p) => data[p]?.trim()).join('-');
			}
		}
		return '';
	},
	defaultSpecData: () => {
		// To be filled from old formBuilder
		return { type: 'phone', label_text: 'Phone', required: false, phone_format: 'other' } as any;
	}
};
