import type { FieldPlugin } from '$lib/types';
import Icon from './Icon.svelte';
import Preview from './Preview.svelte';
import Settings from './Settings.svelte';
import type { WebsiteFieldData } from './types';

export const websitePlugin: FieldPlugin<WebsiteFieldData> = {
	type: 'website',
	widgetName: 'Website',
	icon: Icon as any,
	preview: Preview as any,
	settings: Settings as any,
	defaultValue: () => {
		// To be filled from old formBuilder
		return { type: 'website', label_text: 'Website', required: false } as any;
	}
};
