import type { FieldPlugin } from '$lib/types';
import Icon from './Icon.svelte';
import Preview from './Preview.svelte';
import Settings from './Settings.svelte';
import type { NumberFieldData } from './types';

export const numberPlugin: FieldPlugin<NumberFieldData> = {
	type: 'number',
	widgetName: 'Number',
	icon: Icon as any,
	preview: Preview as any,
	settings: Settings as any,
	defaultValue: () => {
		// To be filled from old formBuilder
		return { type: 'number', label_text: 'Number', required: false } as any;
	}
};
