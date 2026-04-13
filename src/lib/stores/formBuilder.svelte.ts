import type { FieldData, FieldType, FieldTypeDefinition } from '$lib/types';

let _idCounter = 0;
function generateId(): string {
	return `fb_${Date.now()}_${++_idCounter}`;
}

// -- Field type icon map --
export const fieldTypeIcons: Record<FieldType, string> = {
	text: '✏️',
	number: '🔢',
	textarea: '📝',
	checkbox: '☑️',
	radio: '🔘',
	select: '📋',
	name: '👤',
	date: '📅',
	file: '📎',
	address: '📍',
	email: '✉️',
	time: '🕐',
	website: '🌐',
	phone: '📞',
	signature: '✍️'
};

// -- Default value factories for each field type --

const fieldTypeDefinitions: FieldTypeDefinition[] = [
	{
		type: 'text',
		widgetName: 'Single Line Text',
		defaultValue: () => ({
			type: 'text',
			id: generateId(),
			label_text: 'Untitled',
			default_text: '',
			field_size: 'medium',
			required: false,
			range_min: null,
			range_max: null,
			range_type: 'characters'
		})
	},
	{
		type: 'number',
		widgetName: 'Number',
		defaultValue: () => ({
			type: 'number',
			id: generateId(),
			label_text: 'Number',
			default_text: '',
			field_size: 'medium',
			required: false,
			range_min: null,
			range_max: null,
			range_type: 'value'
		})
	},
	{
		type: 'textarea',
		widgetName: 'Paragraph Text',
		defaultValue: () => ({
			type: 'textarea',
			id: generateId(),
			label_text: 'Untitled',
			default_text: '',
			field_size: 'medium',
			required: false,
			range_min: null,
			range_max: null,
			range_type: 'characters'
		})
	},
	{
		type: 'checkbox',
		widgetName: 'Checkboxes',
		defaultValue: () => ({
			type: 'checkbox',
			id: generateId(),
			label_text: 'Check All That Apply',
			field_layout: 'one_column',
			required: false,
			checkboxes: [
				{ text: 'First Choice', checked: false },
				{ text: 'Second Choice', checked: false },
				{ text: 'Third Choice', checked: false }
			]
		})
	},
	{
		type: 'radio',
		widgetName: 'Multiple Choice',
		defaultValue: () => ({
			type: 'radio',
			id: generateId(),
			label_text: 'Select a Choice',
			field_layout: 'one_column',
			required: false,
			radios: [
				{ text: 'First Choice', checked: false },
				{ text: 'Second Choice', checked: false },
				{ text: 'Third Choice', checked: false }
			]
		})
	},
	{
		type: 'select',
		widgetName: 'Dropdown',
		defaultValue: () => ({
			type: 'select',
			id: generateId(),
			label_text: 'Select a Choice',
			field_size: 'medium',
			required: false,
			options: [
				{ text: 'First Choice', checked: false },
				{ text: 'Second Choice', checked: false },
				{ text: 'Third Choice', checked: false }
			]
		})
	},
	{
		type: 'name',
		widgetName: 'Name',
		defaultValue: () => ({
			type: 'name',
			id: generateId(),
			label_text: 'Name',
			name_format: 'normal',
			required: false
		})
	},
	{
		type: 'date',
		widgetName: 'Date',
		defaultValue: () => ({
			type: 'date',
			id: generateId(),
			label_text: 'Date',
			date_format: 'mm/dd/yyyy',
			required: false
		})
	},
	{
		type: 'file',
		widgetName: 'File Upload',
		defaultValue: () => ({
			type: 'file',
			id: generateId(),
			label_text: 'Upload a File',
			required: false
		})
	},
	{
		type: 'address',
		widgetName: 'Address',
		defaultValue: () => ({
			type: 'address',
			id: generateId(),
			label_text: 'Address',
			required: false,
			country: ''
		})
	},
	{
		type: 'email',
		widgetName: 'Email',
		defaultValue: () => ({
			type: 'email',
			id: generateId(),
			label_text: 'Email',
			default_text: '',
			field_size: 'medium',
			required: false
		})
	},
	{
		type: 'time',
		widgetName: 'Time',
		defaultValue: () => ({
			type: 'time',
			id: generateId(),
			label_text: 'Time',
			required: false
		})
	},
	{
		type: 'website',
		widgetName: 'Website',
		defaultValue: () => ({
			type: 'website',
			id: generateId(),
			label_text: 'Website',
			default_text: '',
			field_size: 'medium',
			required: false
		})
	},
	{
		type: 'phone',
		widgetName: 'Phone',
		defaultValue: () => ({
			type: 'phone',
			id: generateId(),
			label_text: 'Phone',
			phone_format: 'other',
			required: false
		})
	},
	{
		type: 'signature',
		widgetName: 'Signature',
		defaultValue: () => ({
			type: 'signature',
			id: generateId(),
			label_text: 'Signature',
			required: false
		})
	}
];

// -- Reactive state --

let formFields: FieldData[] = $state([]);
let selectedFieldId: string | null = $state(null);

// -- Public API --

export function getFieldTypeDefinitions(): FieldTypeDefinition[] {
	return fieldTypeDefinitions;
}

export function findFieldTypeDefinition(type: FieldType): FieldTypeDefinition | undefined {
	return fieldTypeDefinitions.find((d) => d.type === type);
}

/** Get the ordered list of all form fields */
export function getFormFields(): FieldData[] {
	return formFields;
}

/** Get the ID of the currently selected field */
export function getSelectedFieldId(): string | null {
	return selectedFieldId;
}

/** Get the data of the currently selected field */
export function getSelectedField(): FieldData | null {
	if (!selectedFieldId) return null;
	return formFields.find((f) => f.id === selectedFieldId) ?? null;
}

/** Select a field by its ID */
export function selectField(id: string | null): void {
	selectedFieldId = id;
}

/** Add a new field of the given type to the end of the form */
export function addField(type: FieldType): string | null {
	const def = findFieldTypeDefinition(type);
	if (!def) return null;
	const field = def.defaultValue();
	formFields = [...formFields, field];
	selectedFieldId = field.id;
	return field.id;
}

/** Insert a new field at a specific index */
export function insertFieldAt(type: FieldType, index: number): string | null {
	const def = findFieldTypeDefinition(type);
	if (!def) return null;
	const field = def.defaultValue();
	const next = [...formFields];
	next.splice(index, 0, field);
	formFields = next;
	selectedFieldId = field.id;
	return field.id;
}

/** Remove a field by its ID */
export function removeField(id: string): void {
	const idx = formFields.findIndex((f) => f.id === id);
	if (idx === -1) return;
	formFields = formFields.filter((f) => f.id !== id);
	if (selectedFieldId === id) {
		// Select the nearest remaining field
		if (formFields.length === 0) {
			selectedFieldId = null;
		} else {
			selectedFieldId = formFields[Math.min(idx, formFields.length - 1)].id;
		}
	}
}

/** Move a field from one position to another */
export function moveField(fromIndex: number, toIndex: number): void {
	if (fromIndex === toIndex) return;
	if (fromIndex < 0 || fromIndex >= formFields.length) return;
	if (toIndex < 0 || toIndex >= formFields.length) return;
	const next = [...formFields];
	const [moved] = next.splice(fromIndex, 1);
	next.splice(toIndex, 0, moved);
	formFields = next;
}

/** Update a specific field by its ID with new data */
export function updateField(id: string, data: FieldData): void {
	formFields = formFields.map((f) => (f.id === id ? { ...data } : f));
}

/** Duplicate a field */
export function duplicateField(id: string): void {
	const idx = formFields.findIndex((f) => f.id === id);
	if (idx === -1) return;
	const original = formFields[idx];
	const clone = { ...JSON.parse(JSON.stringify(original)), id: generateId() };
	const next = [...formFields];
	next.splice(idx + 1, 0, clone);
	formFields = next;
	selectedFieldId = clone.id;
}
