import type { FieldSpecPlugin } from '$lib/core';
import Icon from './Icon.svelte';
import Input from './Input.svelte';
import Preview from './Preview.svelte';
import Settings from './Settings.svelte';
import type { TimeFieldSpec } from './types';

export const timePlugin: FieldSpecPlugin<TimeFieldSpec> = {
	type: 'time',
	widgetName: 'Time',
	icon: Icon as any,
	preview: Preview as any,
	settings: Settings as any,
	inputField: Input as any,
	validateField: (data: TimeFieldSpec) => {
		const h = (data.h || '').trim();
		const m = (data.m || '').trim();
		const s = (data.s || '').trim();

		const allEmpty = h === '' && m === '' && s === '';

		if (data.required && allEmpty) {
			data.error = 'This field is required. Please select a value.';
			return false;
		}

		if (!allEmpty) {
			const hh = h === '' ? 0 : parseInt(h, 10);
			const mm = m === '' ? 0 : parseInt(m, 10);
			const ss = s === '' ? 0 : parseInt(s, 10);

			if (isNaN(hh) || isNaN(mm) || isNaN(ss)) {
				data.error = 'Invalid Time';
				return false;
			}

			// Validate values for 12-hour clock
			if (hh < 1 || hh > 12 || mm < 0 || mm > 59 || ss < 0 || ss > 59) {
				data.error = 'Invalid Time';
				return false;
			}
		}

		return true;
	},
	fieldInstanceValue: (data: TimeFieldSpec) => {
		const h = (data.h || '').trim();
		const m = (data.m || '').trim();
		const s = (data.s || '').trim();
		const ampm = data.ampm || 'am';

		if (h === '' && m === '' && s === '') {
			return {};
		}

		return { h, m, s, ampm };
	},
	defaultSpecData: () => {
		// To be filled from old formBuilder
		return { type: 'time', label_text: 'Time', required: false } as any;
	}
};
