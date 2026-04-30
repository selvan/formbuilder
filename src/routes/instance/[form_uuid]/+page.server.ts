import { getDesign } from '$lib/server/forms';

export function load({ params }) {
	const design = getDesign(params.form_uuid);

	return {
		form_uuid: design.form_uuid,
		document: {
			address: `/instance/${design.form_uuid}`,
			fields: design.fields
		}
	};
}
