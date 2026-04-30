import { fieldRegistry } from '$lib/core';
import { defaultPlugins } from './index';
import { customPlugins } from './custom.generated';

fieldRegistry.registerAll(defaultPlugins);
fieldRegistry.registerAll(customPlugins);
