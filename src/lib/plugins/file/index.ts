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
	validateField: (data: FileFieldSpec) => {
		if (data.required && !data.file) {
			data.error = 'This field is required. Please select a file.';
			return false;
		}
		return true;
	},
	fieldInstanceValue: (data: FileFieldSpec) => {
		if (data.file) {
			return {
				file_name: data.file.name,
				type: data.file.type
			};
		}
		return {};
	},
	defaultSpecData: () => {
		// To be filled from old formBuilder
		return { type: 'file', label_text: 'File Upload', required: false } as any;
	}
};
