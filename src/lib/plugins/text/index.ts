import type { FieldPlugin } from '$lib/types';
import Icon from './Icon.svelte';
import Preview from './Preview.svelte';
import Settings from './Settings.svelte';
import type { TextFieldData } from './types';

export const textPlugin: FieldPlugin<TextFieldData> = {
	type: 'text',
	widgetName: 'Single Line Text',
	icon: Icon as any,
	preview: Preview as any,
	settings: Settings as any,
	defaultValue: () => {
		// To be filled from old formBuilder
		return { type: 'text', label_text: 'Single Line Text', required: false } as any;
	}
};
