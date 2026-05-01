import type { FieldPlugin } from '$lib/core';
import Icon from './Icon.svelte';
import Instance from './Instance.svelte';
import Preview from './Preview.svelte';
import Settings from './Settings.svelte';
import type { DateFieldSpec } from './types';

export const datePlugin: FieldPlugin<DateFieldSpec> = {
	type: 'date',
	widgetName: 'Date',
	icon: Icon as any,
	preview: Preview as any,
	settings: Settings as any,
	instance: Instance as any,
	defaultSpecData: () => {
		// To be filled from old formBuilder
		return { type: 'date', label_text: 'Date', required: false, date_format: 'mm/dd/yyyy' } as any;
	},
	validateField: (data: DateFieldSpec) => {
		const parts = ['mm', 'dd', 'yyyy'] as const;
		const values = parts.map((p) => data[p]?.toString().trim() || '');

		if (data.required && values.some((v) => v === '')) {
			data.error = 'This field is required. Please select a value.';
			return false;
		}

		if (!data.required && values.every((v) => v === '')) {
			return true;
		}

		// If any part is filled, we validate the whole date
		if (values.some((v) => v !== '')) {
			// Ensure all parts are numeric
			if (values.some((v) => isNaN(Number(v)) || v === '')) {
				data.error = 'Invalid date. Please select a valid date';
				return false;
			}

			const [m, d, y] = values.map(Number);
			const date = new Date(y, m - 1, d);

			// Check if it's a valid date (e.g. Feb 30 becomes March 2 in JS)
			if (date.getFullYear() !== y || date.getMonth() !== m - 1 || date.getDate() !== d) {
				data.error = 'Invalid date. Please select a valid date';
				return false;
			}
		}

		return true;
	},
	fieldInstanceValue: (data: DateFieldSpec) => {
		const parts = ['mm', 'dd', 'yyyy'] as const;
		if (parts.every((p) => data[p]?.toString().trim() !== '')) {
			return {
				mm: data.mm?.toString().trim(),
				dd: data.dd?.toString().trim(),
				yyyy: data.yyyy?.toString().trim()
			};
		}
		return {};
	}
};
