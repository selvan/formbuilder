import type { BaseFieldSpec, FieldPlugin } from './types';

export class PluginRegistry {
	plugins: Record<string, FieldPlugin<any>> = $state({});

	register<T extends BaseFieldSpec>(plugin: FieldPlugin<T>) {
		this.plugins[plugin.type] = plugin;
	}

	registerAll(plugins: FieldPlugin<any>[]) {
		for (const plugin of plugins) {
			this.register(plugin);
		}
	}

	get(type: string): FieldPlugin<any> | undefined {
		return this.plugins[type];
	}

	getAll(): FieldPlugin<any>[] {
		return Object.values(this.plugins);
	}
}

export const fieldRegistry = new PluginRegistry();
