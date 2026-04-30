import type { FieldPlugin } from '$lib/core';
export { customPlugins } from './custom.generated';

import { addressPlugin } from './address';
import { checkboxPlugin } from './checkbox';
import { datePlugin } from './date';
import { emailPlugin } from './email';
import { filePlugin } from './file';
import { namePlugin } from './name';
import { numberPlugin } from './number';
import { phonePlugin } from './phone';
import { radioPlugin } from './radio';
import { selectPlugin } from './select';
import { signaturePlugin } from './signature';
import { textPlugin } from './text';
import { textareaPlugin } from './textarea';
import { timePlugin } from './time';
import { websitePlugin } from './website';

export { addressPlugin } from './address';
export { checkboxPlugin } from './checkbox';
export { datePlugin } from './date';
export { emailPlugin } from './email';
export { filePlugin } from './file';
export { namePlugin } from './name';
export { numberPlugin } from './number';
export { phonePlugin } from './phone';
export { radioPlugin } from './radio';
export { selectPlugin } from './select';
export { signaturePlugin } from './signature';
export { textPlugin } from './text';
export { textareaPlugin } from './textarea';
export { timePlugin } from './time';
export { websitePlugin } from './website';
export * from './settings';

export const defaultPlugins: FieldPlugin<any>[] = [
	textPlugin,
	numberPlugin,
	textareaPlugin,
	checkboxPlugin,
	radioPlugin,
	selectPlugin,
	namePlugin,
	datePlugin,
	filePlugin,
	addressPlugin,
	emailPlugin,
	timePlugin,
	websitePlugin,
	phonePlugin,
	signaturePlugin
];
