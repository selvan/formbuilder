import type { Component } from 'svelte';

export interface Choice {
	text: string;
	checked: boolean;
}

export type FieldSize = 'small' | 'medium' | 'large';

export type FieldLayout = 'one_column' | 'two_columns' | 'three_columns' | 'side_by_side';

export type NameFormat = 'simple' | 'extended';

export type DateFormat = 'mm/dd/yyyy' | 'dd/mm/yyyy';

export type PhoneFormat = 'international' | 'other';

export enum ShareOption {
	None = 'none',
	Url = 'url',
	Email = 'email'
}

export interface BaseFieldSpec {
	id: string;
	type: string;
	label_text: string;
	required: boolean;
	error?: string;
	[key: string]: any;
}

export type FieldSpec = BaseFieldSpec;

export interface DocumentInstanceField {
	id: string | number;
	value?: FieldSpec;
	error?: string;
}

export interface DocumentInstanceData {
	address?: string;
	share_options?: ShareOption;
	fields: Array<FieldSpec | DocumentInstanceField>;
}

export interface FieldSpecPluginBase<T extends BaseFieldSpec = BaseFieldSpec> {
	type: string;
	widgetName: string;
	instance: Component<{ data: T; userValue?: any; error?: string; onchange: (value: any) => void }>;
	validateField: (data: T) => boolean;
	fieldInstanceValue: (data: T) => any;
	defaultSpecData: () => Omit<T, 'id'>;
}

export type CliFieldSpecPlugin<T extends BaseFieldSpec = BaseFieldSpec> = FieldSpecPluginBase<T>;

export interface FieldSpecPluginDesignUI<T extends BaseFieldSpec = BaseFieldSpec> {
	icon: Component;
	preview: Component<{ data: T }>;
	settings: Component<{ data: T; onupdate: (data: T) => void }>;
}

export type UIFieldSpecPlugin<T extends BaseFieldSpec = BaseFieldSpec> = CliFieldSpecPlugin<T> &
	FieldSpecPluginDesignUI<T>;

export type FieldSpecPlugin<T extends BaseFieldSpec = BaseFieldSpec> =
	| UIFieldSpecPlugin<T>
	| CliFieldSpecPlugin<T>;

export function hasFieldPluginDesignUi<T extends BaseFieldSpec>(
	plugin: FieldSpecPlugin<T>
): plugin is UIFieldSpecPlugin<T> {
	return 'icon' in plugin && 'preview' in plugin && 'settings' in plugin;
}
