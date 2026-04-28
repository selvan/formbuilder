// Choice item used by checkbox, radio, select
export interface Choice {
	text: string;
	checked: boolean;
}

// Field size options
export type FieldSize = 'small' | 'medium' | 'large';

// Field layout options for checkbox/radio
export type FieldLayout = 'one_column' | 'two_columns' | 'three_columns' | 'side_by_side';

// Name format
export type NameFormat = 'normal' | 'extended';

// Date format
export type DateFormat = 'mm/dd/yyyy' | 'dd/mm/yyyy';

// Phone format
export type PhoneFormat = 'international' | 'other';

// -- Base Field Data --
export interface BaseFieldData {
	id: string;
	type: string;
	label_text: string;
	required: boolean;
	[key: string]: any; // Allow plugins to extend with their own properties
}

export type FieldData = BaseFieldData;

import type { Component } from 'svelte';

// Plugin architecture definition
export interface FieldPlugin<T extends BaseFieldData = BaseFieldData> {
	type: string;
	widgetName: string;
	icon: Component;
	preview: Component<{ data: T }>;
	settings: Component<{ data: T; onupdate: (data: T) => void }>;
	instance: Component<{ data: T; userValue?: any; error?: string; onchange: (value: any) => void }>;
	defaultValue: () => Omit<T, 'id'>;
}
