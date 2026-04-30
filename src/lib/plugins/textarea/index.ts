import type { FieldPlugin } from '$lib/core';
import Icon from './Icon.svelte';
import Instance from './Instance.svelte';
import Preview from './Preview.svelte';
import Settings from './Settings.svelte';
import type { TextareaFieldSpec } from './types';

export const textareaPlugin: FieldPlugin<TextareaFieldSpec> = {
	type: 'textarea',
	widgetName: 'Paragraph Text',
	icon: Icon as any,
	preview: Preview as any,
	settings: Settings as any,
	instance: Instance as any,
	defaultSpecData: () => {
		// To be filled from old formBuilder
		return { type: 'textarea', label_text: 'Paragraph Text', required: false } as any;
	}
};
