import type { FieldSpecPlugin } from '$lib/core';
import Icon from './Icon.svelte';
import Instance from './Instance.svelte';
import Preview from './Preview.svelte';
import Settings from './Settings.svelte';
import type { WebsiteFieldSpec } from './types';

export const websitePlugin: FieldSpecPlugin<WebsiteFieldSpec> = {
	type: 'website',
	widgetName: 'Website',
	icon: Icon as any,
	preview: Preview as any,
	settings: Settings as any,
	instance: Instance as any,
	validateField: (data: WebsiteFieldSpec) => {
		const val = (data.value || '').trim();
		if (data.required && val === '') {
			data.error = 'This field is required. Please enter a value.';
			return false;
		}

		if (val !== '' && !/^(http|https|ftp):\/\/[^\s/$.?#].[^\s]*$/i.test(val)) {
			data.error = 'Please enter a valid url in http://website.com format.';
			return false;
		}

		return true;
	},
	fieldInstanceValue: (data: WebsiteFieldSpec) => {
		return (data.value || '').trim();
	},
	defaultSpecData: () => {
		// To be filled from old formBuilder
		return { type: 'website', label_text: 'Website', required: false, field_size: 'medium', default_text: '' } as any;
	}
};
