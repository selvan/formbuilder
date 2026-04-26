// place files you want to import through the `$lib` alias in this folder.
import { fieldRegistry } from './stores/registry.svelte';

import { textPlugin } from './plugins/text';
import { numberPlugin } from './plugins/number';
import { textareaPlugin } from './plugins/textarea';
import { checkboxPlugin } from './plugins/checkbox';
import { radioPlugin } from './plugins/radio';
import { selectPlugin } from './plugins/select';
import { namePlugin } from './plugins/name';
import { datePlugin } from './plugins/date';
import { filePlugin } from './plugins/file';
import { addressPlugin } from './plugins/address';
import { emailPlugin } from './plugins/email';
import { timePlugin } from './plugins/time';
import { websitePlugin } from './plugins/website';
import { phonePlugin } from './plugins/phone';
import { signaturePlugin } from './plugins/signature';

// Register all default plugins
fieldRegistry.register(textPlugin);
fieldRegistry.register(numberPlugin);
fieldRegistry.register(textareaPlugin);
fieldRegistry.register(checkboxPlugin);
fieldRegistry.register(radioPlugin);
fieldRegistry.register(selectPlugin);
fieldRegistry.register(namePlugin);
fieldRegistry.register(datePlugin);
fieldRegistry.register(filePlugin);
fieldRegistry.register(addressPlugin);
fieldRegistry.register(emailPlugin);
fieldRegistry.register(timePlugin);
fieldRegistry.register(websitePlugin);
fieldRegistry.register(phonePlugin);
fieldRegistry.register(signaturePlugin);

export { fieldRegistry };
