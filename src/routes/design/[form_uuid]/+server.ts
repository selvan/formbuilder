import { json, error } from '@sveltejs/kit';
import { saveDesign } from '$lib/server/forms';
import type { FieldData } from '$lib/core';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ params, request }) => {
	const payload = await request.json().catch(() => null);

	if (!payload || !Array.isArray(payload.fields)) {
		error(400, 'Expected JSON body with a fields array');
	}

	const design = saveDesign(params.form_uuid, payload.fields as FieldData[]);

	return json({
		ok: true,
		design
	});
};
