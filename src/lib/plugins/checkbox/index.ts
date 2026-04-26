import type { FieldPlugin } from '$lib/types';
import Icon from './Icon.svelte';
import Preview from './Preview.svelte';
import Settings from './Settings.svelte';
import type { CheckboxFieldData } from './types';

export const checkboxPlugin: FieldPlugin<CheckboxFieldData> = {
	type: 'checkbox',
	widgetName: 'Checkboxes',
	icon: Icon as any,
	preview: Preview as any,
	settings: Settings as any,
	defaultValue: () => {
		// To be filled from old formBuilder
		return { type: 'checkbox', label_text: 'Checkboxes', required: false } as any;
	}
};
