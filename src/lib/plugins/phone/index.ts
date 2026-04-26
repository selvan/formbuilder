import type { FieldPlugin } from '$lib/types';
import Icon from './Icon.svelte';
import Preview from './Preview.svelte';
import Settings from './Settings.svelte';
import type { PhoneFieldData } from './types';

export const phonePlugin: FieldPlugin<PhoneFieldData> = {
	type: 'phone',
	widgetName: 'Phone',
	icon: Icon as any,
	preview: Preview as any,
	settings: Settings as any,
	defaultValue: () => {
		// To be filled from old formBuilder
		return { type: 'phone', label_text: 'Phone', required: false } as any;
	}
};
