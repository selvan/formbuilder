import type { FieldSpec } from '$lib/core';

export interface StoredDesign {
	form_uuid: string;
	fields: FieldSpec[];
	updated_at: string;
}

export interface StoredInstance {
	form_uuid: string;
	values: Record<string, unknown>;
	submitted_at: string;
}

const designs = new Map<string, StoredDesign>();
const instances = new Map<string, StoredInstance[]>();

export function createEmptyDesign(form_uuid: string): StoredDesign {
	return {
		form_uuid,
		fields: [],
		updated_at: new Date().toISOString()
	};
}

export function getDesign(form_uuid: string): StoredDesign {
	return designs.get(form_uuid) ?? createEmptyDesign(form_uuid);
}

export function saveDesign(form_uuid: string, fields: FieldSpec[]): StoredDesign {
	const design = {
		form_uuid,
		fields,
		updated_at: new Date().toISOString()
	};
	designs.set(form_uuid, design);
	return design;
}

export function saveInstance(
	form_uuid: string,
	values: Record<string, unknown>
): StoredInstance {
	const instance = {
		form_uuid,
		values,
		submitted_at: new Date().toISOString()
	};
	const existing = instances.get(form_uuid) ?? [];
	instances.set(form_uuid, [...existing, instance]);
	return instance;
}
