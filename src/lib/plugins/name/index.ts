import type { FieldPlugin } from '$lib/core';
import Icon from './Icon.svelte';
import Instance from './Instance.svelte';
import Preview from './Preview.svelte';
import Settings from './Settings.svelte';
import type { NameFieldSpec } from './types';

export const namePlugin: FieldPlugin<NameFieldSpec> = {
	type: 'name',
	widgetName: 'Name',
	icon: Icon as any,
	preview: Preview as any,
	settings: Settings as any,
	instance: Instance as any,
	validateField: (data: NameFieldSpec) => {
		if (data.required) {
			if (!data.first?.trim() || !data.last?.trim()) {
				data.error = 'This field is required. Please enter a value.';
				return false;
			}
			if (data.name_format === 'extended') {
				if (!data.title?.trim() || !data.suffix?.trim()) {
					data.error = 'This field is required. Please enter a value.';
					return false;
				}
			}
		}
		return true;
	},
	fieldInstanceValue: (data: NameFieldSpec) => {
		return {
			first: data.first?.trim() || '',
			last: data.last?.trim() || '',
			title: data.title?.trim() || '',
			suffix: data.suffix?.trim() || '',
			name_format: data.name_format
		};
	},
	defaultSpecData: () => {
		// To be filled from old formBuilder
		return { type: 'name', label_text: 'Name', required: false, name_format: 'normal' } as any;
	}
};
