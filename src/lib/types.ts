// Field type identifiers
export const FIELD_TYPES = [
	'text',
	'number',
	'textarea',
	'checkbox',
	'radio',
	'select',
	'name',
	'date',
	'file',
	'address',
	'email',
	'time',
	'website',
	'phone',
	'signature'
] as const;

export type FieldType = (typeof FIELD_TYPES)[number];

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

// -- Per-field data interfaces --

export interface TextFieldData {
	type: 'text';
	id: string;
	label_text: string;
	default_text: string;
	field_size: FieldSize;
	required: boolean;
	range_min: number | null;
	range_max: number | null;
	range_type: 'characters' | 'words';
}

export interface NumberFieldData {
	type: 'number';
	id: string;
	label_text: string;
	default_text: string;
	field_size: FieldSize;
	required: boolean;
	range_min: number | null;
	range_max: number | null;
	range_type: 'value' | 'digits';
}

export interface TextareaFieldData {
	type: 'textarea';
	id: string;
	label_text: string;
	default_text: string;
	field_size: FieldSize;
	required: boolean;
	range_min: number | null;
	range_max: number | null;
	range_type: 'characters' | 'words';
}

export interface CheckboxFieldData {
	type: 'checkbox';
	id: string;
	label_text: string;
	field_layout: FieldLayout;
	required: boolean;
	checkboxes: Choice[];
}

export interface RadioFieldData {
	type: 'radio';
	id: string;
	label_text: string;
	field_layout: FieldLayout;
	required: boolean;
	radios: Choice[];
}

export interface SelectFieldData {
	type: 'select';
	id: string;
	label_text: string;
	field_size: FieldSize;
	required: boolean;
	options: Choice[];
}

export interface NameFieldData {
	type: 'name';
	id: string;
	label_text: string;
	name_format: NameFormat;
	required: boolean;
}

export interface DateFieldData {
	type: 'date';
	id: string;
	label_text: string;
	date_format: DateFormat;
	required: boolean;
}

export interface FileFieldData {
	type: 'file';
	id: string;
	label_text: string;
	required: boolean;
}

export interface AddressFieldData {
	type: 'address';
	id: string;
	label_text: string;
	required: boolean;
	country: string;
}

export interface EmailFieldData {
	type: 'email';
	id: string;
	label_text: string;
	default_text: string;
	field_size: FieldSize;
	required: boolean;
}

export interface TimeFieldData {
	type: 'time';
	id: string;
	label_text: string;
	required: boolean;
}

export interface WebsiteFieldData {
	type: 'website';
	id: string;
	label_text: string;
	default_text: string;
	field_size: FieldSize;
	required: boolean;
}

export interface PhoneFieldData {
	type: 'phone';
	id: string;
	label_text: string;
	phone_format: PhoneFormat;
	required: boolean;
}

export interface SignatureFieldData {
	type: 'signature';
	id: string;
	label_text: string;
	required: boolean;
}

// Discriminated union of all field data
export type FieldData =
	| TextFieldData
	| NumberFieldData
	| TextareaFieldData
	| CheckboxFieldData
	| RadioFieldData
	| SelectFieldData
	| NameFieldData
	| DateFieldData
	| FileFieldData
	| AddressFieldData
	| EmailFieldData
	| TimeFieldData
	| WebsiteFieldData
	| PhoneFieldData
	| SignatureFieldData;

// Field type definition for the registry
export interface FieldTypeDefinition {
	type: FieldType;
	widgetName: string;
	defaultValue: () => FieldData;
}
