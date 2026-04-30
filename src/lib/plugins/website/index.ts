import type { FieldPlugin } from '$lib/core';
import Icon from './Icon.svelte';
import Instance from './Instance.svelte';
import Preview from './Preview.svelte';
import Settings from './Settings.svelte';
import type { WebsiteFieldSpec } from './types';

export const websitePlugin: FieldPlugin<WebsiteFieldSpec> = {
	type: 'website',
	widgetName: 'Website',
	icon: Icon as any,
	preview: Preview as any,
	settings: Settings as any,
	instance: Instance as any,
	defaultSpecData: () => {
		// To be filled from old formBuilder
		return { type: 'website', label_text: 'Website', required: false } as any;
	}
};
