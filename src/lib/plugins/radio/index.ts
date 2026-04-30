import type { FieldPlugin } from '$lib/core';
import Icon from './Icon.svelte';
import Instance from './Instance.svelte';
import Preview from './Preview.svelte';
import Settings from './Settings.svelte';
import type { RadioFieldSpec } from './types';

export const radioPlugin: FieldPlugin<RadioFieldSpec> = {
	type: 'radio',
	widgetName: 'Multiple Choice',
	icon: Icon as any,
	preview: Preview as any,
	settings: Settings as any,
	instance: Instance as any,
	defaultSpecData: () => ({
		type: 'radio',
		label_text: 'Multiple Choice',
		required: false,
		field_layout: 'one_column',
		radios: [
			{ text: 'Option 1', checked: false },
			{ text: 'Option 2', checked: false },
			{ text: 'Option 3', checked: false }
		]
	})
};
