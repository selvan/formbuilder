import type { FieldPlugin } from '$lib/types';
import Icon from './Icon.svelte';
import Preview from './Preview.svelte';
import Settings from './Settings.svelte';
import type { SelectFieldData } from './types';

export const selectPlugin: FieldPlugin<SelectFieldData> = {
	type: 'select',
	widgetName: 'Dropdown',
	icon: Icon as any,
	preview: Preview as any,
	settings: Settings as any,
	defaultValue: () => {
		// To be filled from old formBuilder
		return { type: 'select', label_text: 'Dropdown', required: false } as any;
	}
};
