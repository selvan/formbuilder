import type { FieldPlugin, BaseFieldData } from '$lib/types';

class PluginRegistry {
	plugins: Record<string, FieldPlugin<any>> = $state({});

	register<T extends BaseFieldData>(plugin: FieldPlugin<T>) {
		this.plugins[plugin.type] = plugin;
	}

	get(type: string): FieldPlugin<any> | undefined {
		return this.plugins[type];
	}

	getAll(): FieldPlugin<any>[] {
		return Object.values(this.plugins);
	}
}

export const fieldRegistry = new PluginRegistry();

