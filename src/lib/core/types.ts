import type { Component } from 'svelte';

export interface Choice {
	text: string;
	checked: boolean;
}

export type FieldSize = 'small' | 'medium' | 'large';

export type FieldLayout = 'one_column' | 'two_columns' | 'three_columns' | 'side_by_side';

export type NameFormat = 'normal' | 'extended';

export type DateFormat = 'mm/dd/yyyy' | 'dd/mm/yyyy';

export type PhoneFormat = 'international' | 'other';

export interface BaseFieldData {
	id: string;
	type: string;
	label_text: string;
	required: boolean;
	[key: string]: any;
}

export type FieldData = BaseFieldData;

export interface DocumentInstanceField {
	id: string | number;
	value?: FieldData;
	error?: string;
}

export interface DocumentInstanceData {
	address?: string;
	share_option?: string;
	fields: Array<FieldData | DocumentInstanceField>;
}

export interface FieldPluginDesignUi<T extends BaseFieldData = BaseFieldData> {
	icon: Component;
	preview: Component<{ data: T }>;
	settings: Component<{ data: T; onupdate: (data: T) => void }>;
}

export interface FieldPluginBase<T extends BaseFieldData = BaseFieldData> {
	type: string;
	widgetName: string;
	instance: Component<{ data: T; userValue?: any; error?: string; onchange: (value: any) => void }>;
	defaultValue: () => Omit<T, 'id'>;
}

export type UiFieldPlugin<T extends BaseFieldData = BaseFieldData> = FieldPluginBase<T> &
	FieldPluginDesignUi<T>;

export type CliFieldPlugin<T extends BaseFieldData = BaseFieldData> = FieldPluginBase<T> & {
	icon?: never;
	preview?: never;
	settings?: never;
};

export type FieldPlugin<T extends BaseFieldData = BaseFieldData> =
	| UiFieldPlugin<T>
	| CliFieldPlugin<T>;

export function hasFieldPluginDesignUi<T extends BaseFieldData>(
	plugin: FieldPlugin<T>
): plugin is UiFieldPlugin<T> {
	return 'icon' in plugin && 'preview' in plugin && 'settings' in plugin;
}
