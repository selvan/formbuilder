import type { FieldPlugin } from '$lib/types';
import Icon from './Icon.svelte';
import Preview from './Preview.svelte';
import Settings from './Settings.svelte';
import type { TextareaFieldData } from './types';

export const textareaPlugin: FieldPlugin<TextareaFieldData> = {
	type: 'textarea',
	widgetName: 'Paragraph Text',
	icon: Icon as any,
	preview: Preview as any,
	settings: Settings as any,
	defaultValue: () => {
		// To be filled from old formBuilder
		return { type: 'textarea', label_text: 'Paragraph Text', required: false } as any;
	}
};
