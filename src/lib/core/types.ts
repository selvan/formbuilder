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

export type JSONValue =
	| string
	| number
	| boolean
	| null
	| JSONValue[]
	| { [key: string]: JSONValue };

export interface DocumentInputField {
	id: string | number;
	fieldSpec: FieldSpec;
	fieldValue?: JSONValue;
	error?: string;
}

export interface DocumentInput {
	address?: string;
	share_options?: ShareOption;
	fields: DocumentInputField[];
}

export interface FieldSpecPluginBase<T extends BaseFieldSpec = BaseFieldSpec> {
	type: string;
	widgetName: string;
	validateField: (data: T) => boolean;
	fieldInstanceValue: (data: T) => any;
	defaultSpecData: () => Omit<T, 'id'>;
}

export type CliFieldSpecPlugin<T extends BaseFieldSpec = BaseFieldSpec> = FieldSpecPluginBase<T>;

export interface FieldSpecDesignPluginUIComponent<T extends BaseFieldSpec = BaseFieldSpec> {
	icon: Component;
	preview: Component<{ data: T }>;
	settings: Component<{ data: T; onupdate: (data: T) => void }>;
}

export type UIFieldSpecDesignPlugin<T extends BaseFieldSpec = BaseFieldSpec> = CliFieldSpecPlugin<T> &
	FieldSpecDesignPluginUIComponent<T>;

export interface FieldCapturePluginUIComponent<T extends BaseFieldSpec = BaseFieldSpec> {
	inputField: Component<{ data: T; userValue?: any; error?: string; onchange: (value: any) => void }>;
}

export type UIFieldCapturePlugin<T extends BaseFieldSpec = BaseFieldSpec> = CliFieldSpecPlugin<T> &
	FieldCapturePluginUIComponent<T>;

export type FieldSpecPlugin<T extends BaseFieldSpec = BaseFieldSpec> =
	| CliFieldSpecPlugin<T>
	| UIFieldSpecDesignPlugin<T>
	| UIFieldCapturePlugin<T>;

export function isFieldSpecPluginForDesignUI<T extends BaseFieldSpec>(
	plugin: FieldSpecPlugin<T>
): plugin is UIFieldSpecDesignPlugin<T> {
	return 'icon' in plugin && 'preview' in plugin && 'settings' in plugin;
}

export function isFieldSpecPluginForCaptureUI<T extends BaseFieldSpec>(
	plugin: FieldSpecPlugin<T>
): plugin is UIFieldCapturePlugin<T> {
	return 'inputField' in plugin;
}
