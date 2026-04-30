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

export interface FieldPlugin<T extends BaseFieldData = BaseFieldData> {
	type: string;
	widgetName: string;
	icon: Component;
	preview: Component<{ data: T }>;
	settings: Component<{ data: T; onupdate: (data: T) => void }>;
	instance: Component<{ data: T; userValue?: any; error?: string; onchange: (value: any) => void }>;
	defaultValue: () => Omit<T, 'id'>;
}
