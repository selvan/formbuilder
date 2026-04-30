import type { FieldPlugin } from '$lib/core';
import Icon from './Icon.svelte';
import Instance from './Instance.svelte';
import Preview from './Preview.svelte';
import Settings from './Settings.svelte';
import type { NumberFieldSpec } from './types';

export const numberPlugin: FieldPlugin<NumberFieldSpec> = {
	type: 'number',
	widgetName: 'Number',
	icon: Icon as any,
	preview: Preview as any,
	settings: Settings as any,
	instance: Instance as any,
	defaultSpecData: () => {
		// To be filled from old formBuilder
		return { type: 'number', label_text: 'Number', required: false } as any;
	}
};
