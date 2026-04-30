import { getDesign } from '$lib/server/forms';

export function load({ params }) {
	return getDesign(params.form_uuid);
}
