import type { FieldPlugin } from '$lib/types';
import Icon from './Icon.svelte';
import Preview from './Preview.svelte';
import Settings from './Settings.svelte';
import type { RadioFieldData } from './types';

export const radioPlugin: FieldPlugin<RadioFieldData> = {
	type: 'radio',
	widgetName: 'Multiple Choice',
	icon: Icon as any,
	preview: Preview as any,
	settings: Settings as any,
	defaultValue: () => {
		// To be filled from old formBuilder
		return { type: 'radio', label_text: 'Multiple Choice', required: false } as any;
	}
};
