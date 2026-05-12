import type { BaseFieldSpec, FieldSpecPlugin } from './types';

export class PluginRegistry {
	plugins: Record<string, FieldSpecPlugin<any>> = $state({});

	register<T extends BaseFieldSpec>(plugin: FieldSpecPlugin<T>) {
		this.plugins[plugin.type] = plugin;
	}

	registerAll(plugins: FieldSpecPlugin<any>[]) {
		for (const plugin of plugins) {
			this.register(plugin);
		}
	}

	get(type: string): FieldSpecPlugin<any> | undefined {
		return this.plugins[type];
	}

	getAll(): FieldSpecPlugin<any>[] {
		return Object.values(this.plugins);
	}
}

export const fieldRegistry = new PluginRegistry();
