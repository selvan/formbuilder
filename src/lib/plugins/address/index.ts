import type { FieldPlugin } from '$lib/types';
import Icon from './Icon.svelte';
import Preview from './Preview.svelte';
import Settings from './Settings.svelte';
import type { AddressFieldData } from './types';

export const addressPlugin: FieldPlugin<AddressFieldData> = {
	type: 'address',
	widgetName: 'Address',
	icon: Icon as any,
	preview: Preview as any,
	settings: Settings as any,
	defaultValue: () => {
		// To be filled from old formBuilder
		return { type: 'address', label_text: 'Address', required: false } as any;
	}
};
