import type { FieldSpec } from '$lib/core';
import { fieldRegistry } from '$lib/core';

let _idCounter = 0;
export function generateId(): string {
	return `fb_${Date.now()}_${++_idCounter}`;
}

// -- Reactive state --

let formFields: FieldSpec[] = $state([]);
let selectedFieldId: string | null = $state(null);

// -- Public API --

/** Get the ordered list of all form fields */
export function getFormFields(): FieldSpec[] {
	return formFields;
}

/** Replace the current form fields */
export function setFormFields(fields: FieldSpec[]): void {
	formFields = fields.map((field) => ({ ...field }));
	selectedFieldId = formFields[0]?.id ?? null;
}

/** Clear all fields from the builder */
export function clearFormFields(): void {
	formFields = [];
	selectedFieldId = null;
}

/** Get the ID of the currently selected field */
export function getSelectedFieldId(): string | null {
	return selectedFieldId;
}

/** Get the data of the currently selected field */
export function getSelectedField(): FieldSpec | null {
	if (!selectedFieldId) return null;
	return formFields.find((f) => f.id === selectedFieldId) ?? null;
}

/** Select a field by its ID */
export function selectField(id: string | null): void {
	selectedFieldId = id;
}

/** Add a new field of the given type to the end of the form */
export function addField(type: string): string | null {
	const plugin = fieldRegistry.get(type);
	if (!plugin) return null;

	const field = { ...plugin.defaultSpecData(), id: generateId() } as FieldSpec;
	formFields = [...formFields, field];
	selectedFieldId = field.id;
	return field.id;
}

/** Insert a new field at a specific index */
export function insertFieldAt(type: string, index: number): string | null {
	const plugin = fieldRegistry.get(type);
	if (!plugin) return null;

	const field = { ...plugin.defaultSpecData(), id: generateId() } as FieldSpec;
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
export function updateField(id: string, data: FieldSpec): void {
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
