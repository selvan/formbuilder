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
		return { type: 'date', label_text: 'Date', required: false } as any;
	}
};
