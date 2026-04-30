import type { FieldPlugin } from '$lib/core';
import Icon from './Icon.svelte';
import Instance from './Instance.svelte';
import Preview from './Preview.svelte';
import Settings from './Settings.svelte';
import type { TimeFieldData } from './types';

export const timePlugin: FieldPlugin<TimeFieldData> = {
	type: 'time',
	widgetName: 'Time',
	icon: Icon as any,
	preview: Preview as any,
	settings: Settings as any,
	instance: Instance as any,
	defaultValue: () => {
		// To be filled from old formBuilder
		return { type: 'time', label_text: 'Time', required: false } as any;
	}
};
