import type { FieldPlugin } from '$lib/core';
import Icon from './Icon.svelte';
import Instance from './Instance.svelte';
import Preview from './Preview.svelte';
import Settings from './Settings.svelte';
import type { PhoneFieldSpec } from './types';

export const phonePlugin: FieldPlugin<PhoneFieldSpec> = {
	type: 'phone',
	widgetName: 'Phone',
	icon: Icon as any,
	preview: Preview as any,
	settings: Settings as any,
	instance: Instance as any,
	defaultSpecData: () => {
		// To be filled from old formBuilder
		return { type: 'phone', label_text: 'Phone', required: false } as any;
	}
};
