import type { FieldPlugin } from '$lib/core';
import Icon from './Icon.svelte';
import Instance from './Instance.svelte';
import Preview from './Preview.svelte';
import Settings from './Settings.svelte';
import type { AddressFieldSpec } from './types';

export const addressPlugin: FieldPlugin<AddressFieldSpec> = {
	type: 'address',
	widgetName: 'Address',
	icon: Icon as any,
	preview: Preview as any,
	settings: Settings as any,
	instance: Instance as any,
	defaultSpecData: () => {
		// To be filled from old formBuilder
		return { type: 'address', label_text: 'Address', required: false } as any;
	},
	validateField: (data: AddressFieldSpec) => {
		const addressFields = ['line1', 'line2', 'city', 'state', 'zip', 'country'] as const;
		const filledFields = addressFields.filter((f) => data[f]?.toString().trim() !== '').length;

		if (data.required) {
			if (filledFields !== 6) {
				data.error = 'This field is required. Please enter a value.';
				return false;
			}
		}

		if (filledFields > 1 && filledFields < 6) {
			data.error = 'Please enter a value for all sections.';
			return false;
		}

		return true;
	},
	fieldInstanceValue: (data: AddressFieldSpec) => {
		const addressFields = ['line1', 'line2', 'city', 'state', 'zip', 'country'] as const;
		if (addressFields.every((f) => data[f]?.toString().trim() !== '')) {
			const v: Record<string, string> = {};
			addressFields.forEach((f) => {
				v[f] = data[f].toString().trim();
			});
			return v;
		}
		return {};
	}
};
