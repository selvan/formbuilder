import type { FieldPlugin } from '$lib/core';
import Icon from './Icon.svelte';
import Instance from './Instance.svelte';
import Preview from './Preview.svelte';
import Settings from './Settings.svelte';
import type { DateFieldData } from './types';

export const datePlugin: FieldPlugin<DateFieldData> = {
	type: 'date',
	widgetName: 'Date',
	icon: Icon as any,
	preview: Preview as any,
	settings: Settings as any,
	instance: Instance as any,
	defaultValue: () => {
		// To be filled from old formBuilder
		return { type: 'date', label_text: 'Date', required: false } as any;
	}
};
