import { json, error } from '@sveltejs/kit';
import { saveInstance } from '$lib/server/forms';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ params, request }) => {
	const payload = await request.json().catch(() => null);

	if (!payload || typeof payload.values !== 'object' || Array.isArray(payload.values)) {
		error(400, 'Expected JSON body with a values object');
	}

	const instance = saveInstance(params.form_uuid, payload.values as Record<string, unknown>);

	return json({
		ok: true,
		instance
	});
};
