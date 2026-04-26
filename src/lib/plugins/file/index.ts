import type { FieldPlugin } from '$lib/types';
import Icon from './Icon.svelte';
import Preview from './Preview.svelte';
import Settings from './Settings.svelte';
import type { FileFieldData } from './types';

export const filePlugin: FieldPlugin<FileFieldData> = {
	type: 'file',
	widgetName: 'File Upload',
	icon: Icon as any,
	preview: Preview as any,
	settings: Settings as any,
	defaultValue: () => {
		// To be filled from old formBuilder
		return { type: 'file', label_text: 'File Upload', required: false } as any;
	}
};
