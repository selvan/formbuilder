import type { FieldPlugin } from '$lib/core';
import Icon from './Icon.svelte';
import Instance from './Instance.svelte';
import Preview from './Preview.svelte';
import Settings from './Settings.svelte';
import type { CheckboxFieldData } from './types';

export const checkboxPlugin: FieldPlugin<CheckboxFieldData> = {
	type: 'checkbox',
	widgetName: 'Checkboxes',
	icon: Icon as any,
	preview: Preview as any,
	settings: Settings as any,
	instance: Instance as any,
	defaultValue: () => ({
		type: 'checkbox',
		label_text: 'Checkboxes',
		required: false,
		field_layout: 'one_column',
		checkboxes: [
			{ text: 'Option 1', checked: false },
			{ text: 'Option 2', checked: false },
			{ text: 'Option 3', checked: false }
		]
	})
};
