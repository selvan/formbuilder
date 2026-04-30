import type { FieldPlugin } from '$lib/core';
import Icon from './Icon.svelte';
import Instance from './Instance.svelte';
import Preview from './Preview.svelte';
import Settings from './Settings.svelte';
import type { NameFieldData } from './types';

export const namePlugin: FieldPlugin<NameFieldData> = {
	type: 'name',
	widgetName: 'Name',
	icon: Icon as any,
	preview: Preview as any,
	settings: Settings as any,
	instance: Instance as any,
	defaultValue: () => {
		// To be filled from old formBuilder
		return { type: 'name', label_text: 'Name', required: false } as any;
	}
};
