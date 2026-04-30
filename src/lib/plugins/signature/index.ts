import type { FieldPlugin } from '$lib/core';
import Icon from './Icon.svelte';
import Instance from './Instance.svelte';
import Preview from './Preview.svelte';
import Settings from './Settings.svelte';
import type { SignatureFieldSpec } from './types';

export const signaturePlugin: FieldPlugin<SignatureFieldSpec> = {
	type: 'signature',
	widgetName: 'Signature',
	icon: Icon as any,
	preview: Preview as any,
	settings: Settings as any,
	instance: Instance as any,
	defaultSpecData: () => {
		// To be filled from old formBuilder
		return { type: 'signature', label_text: 'Signature', required: false } as any;
	}
};
