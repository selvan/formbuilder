import type { FieldPlugin } from '$lib/types';
import Icon from './Icon.svelte';
import Preview from './Preview.svelte';
import Settings from './Settings.svelte';
import type { EmailFieldData } from './types';

export const emailPlugin: FieldPlugin<EmailFieldData> = {
	type: 'email',
	widgetName: 'Email',
	icon: Icon as any,
	preview: Preview as any,
	settings: Settings as any,
	defaultValue: () => {
		// To be filled from old formBuilder
		return { type: 'email', label_text: 'Email', required: false } as any;
	}
};
