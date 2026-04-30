import type { FieldPlugin } from '$lib/core';
import Icon from './Icon.svelte';
import Instance from './Instance.svelte';
import Preview from './Preview.svelte';
import Settings from './Settings.svelte';
import type { FileFieldSpec } from './types';

export const filePlugin: FieldPlugin<FileFieldSpec> = {
	type: 'file',
	widgetName: 'File Upload',
	icon: Icon as any,
	preview: Preview as any,
	settings: Settings as any,
	instance: Instance as any,
	defaultSpecData: () => {
		// To be filled from old formBuilder
		return { type: 'file', label_text: 'File Upload', required: false } as any;
	}
};
