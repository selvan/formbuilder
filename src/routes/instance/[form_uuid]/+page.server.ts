import { getDesign } from '$lib/server/forms';
import type { DocumentInputField } from '$lib/core';

export function load({ params }) {
	const design = getDesign(params.form_uuid);

	return {
		form_uuid: design.form_uuid,
		document: {
			address: `/instance/${design.form_uuid}`,
			fields: design.fields.map(
				(field): DocumentInputField => ({
					id: field.id,
					fieldSpec: field
				})
			)
		}
	};
}
