<script lang="ts">
	import '$lib/plugins/register';
	import { fieldRegistry } from '$lib/core';
	import type { DocumentInstanceData, DocumentInstanceField, FieldSpec } from '$lib/core';

	type ValuesByField = Record<string, any>;
	type ErrorsByField = Record<string, string>;

	let {
		document,
		userValues = {},
		errors = {},
		action,
		method = 'post',
		disabled = false,
		notice = '',
		onsubmit
	}: {
		document: DocumentInstanceData;
		userValues?: ValuesByField;
		errors?: ErrorsByField;
		action?: string;
		method?: 'post' | 'get';
		disabled?: boolean;
		notice?: string;
		onsubmit?: (values: ValuesByField, event: SubmitEvent) => void;
	} = $props();

	function initialValues(): ValuesByField {
		return { ...userValues };
	}

	let values = $state<ValuesByField>(initialValues());

	function isWrappedField(
		field: FieldSpec | DocumentInstanceField
	): field is DocumentInstanceField {
		return 'value' in field;
	}

	function fieldData(field: FieldSpec | DocumentInstanceField): FieldSpec {
		const data = isWrappedField(field) && field.value ? field.value : (field as FieldSpec);
		const id = String(isWrappedField(field) ? field.id : data.id);
		return { ...data, id };
	}

	function fieldError(field: FieldSpec | DocumentInstanceField): string {
		const id = String(isWrappedField(field) ? field.id : (field as FieldSpec).id);
		return (
			(isWrappedField(field) ? field.error : undefined) || errors[id] || errors[`field${id}`] || ''
		);
	}

	function fieldUserValue(field: FieldSpec | DocumentInstanceField): any {
		const id = String(isWrappedField(field) ? field.id : (field as FieldSpec).id);
		return values[id] ?? values[`field${id}`] ?? userValues[id] ?? userValues[`field${id}`];
	}

	function hasErrors(): boolean {
		return (
			document.fields.some((field) => Boolean(fieldError(field))) || Object.keys(errors).length > 0
		);
	}

	function handleFieldChange(id: string, value: any) {
		values = { ...values, [id]: value, [`field${id}`]: value };
	}

	function handleSubmit(event: SubmitEvent) {
		if (onsubmit) {
			onsubmit(values, event);
		}
	}
</script>

<form
	class="document-instance"
	action={action || document.address || ''}
	{method}
	enctype="multipart/form-data"
	onsubmit={handleSubmit}
>
	{#if notice}
		<div class="notice">{notice}</div>
	{/if}

	{#if hasErrors()}
		<div class="submission-error">
			<p>There was a problem with your submission.</p>
			<p>
				The sections that have errors are highlighted below. Please correct the errors and try
				again.
			</p>
		</div>
	{/if}

	<div class="fields">
		{#each document.fields as field (fieldData(field).id)}
			{@const data = fieldData(field)}
			{@const error = fieldError(field)}
			{@const plugin = fieldRegistry.get(data.type)}
			<section class="field" class:error-field={Boolean(error)} id="field_container{data.id}">
				<header class="field-header">
					<h2 class="field-title">
						{data.label_text}
						{#if data.required}
							<span class="required">*</span>
						{/if}
					</h2>
				</header>

				<div class="field-body">
					{#if error}
						<p class="error-box">{error}</p>
					{/if}

					{#if plugin?.instance}
						{@const Instance = plugin.instance}
						<Instance
							{data}
							userValue={fieldUserValue(field)}
							{error}
							onchange={(value) => handleFieldChange(data.id, value)}
						/>
					{:else}
						<p class="unknown-field">Unknown field type: {data.type}</p>
					{/if}
				</div>
			</section>
		{/each}
	</div>

	<div class="form-actions">
		{#if disabled}
			<input
				type="button"
				class="submit-button disabled"
				value="Submit"
				title="Disabled for demo user"
				disabled
			/>
		{:else}
			<button type="submit" class="submit-button">Submit</button>
		{/if}
	</div>
</form>

<style>
	.document-instance {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		width: 100%;
		max-width: 760px;
		margin: 0 auto;
		color: var(--color-input-text, #e2e8f0);
	}

	.notice,
	.submission-error {
		border: 1px solid var(--color-border, #334155);
		border-radius: 0.5rem;
		padding: 0.85rem 1rem;
		background: rgba(99, 102, 241, 0.08);
	}

	.submission-error {
		border-color: rgba(248, 113, 113, 0.45);
		background: rgba(248, 113, 113, 0.1);
		color: #fecaca;
	}

	.submission-error p {
		margin: 0;
	}

	.submission-error p + p {
		margin-top: 0.35rem;
	}

	.fields {
		display: flex;
		flex-direction: column;
		gap: 0.85rem;
	}

	.field {
		border: 1px solid var(--color-border, #334155);
		border-radius: 0.75rem;
		background: var(--color-surface, #1e293b);
		overflow: hidden;
	}

	.error-field {
		border-color: rgba(248, 113, 113, 0.7);
		box-shadow: 0 0 0 1px rgba(248, 113, 113, 0.18);
	}

	.field-header {
		border-bottom: 1px solid var(--color-border, #334155);
		padding: 0.85rem 1rem;
	}

	.field-title {
		font-size: 1rem;
		font-weight: 600;
		margin: 0;
	}

	.required {
		color: #f87171;
		margin-left: 0.2rem;
	}

	.field-body {
		padding: 1rem;
	}

	.error-box {
		color: #f87171;
		font-size: 0.85rem;
		margin: 0 0 0.75rem;
		padding: 0.45rem 0.65rem;
		background: rgba(248, 113, 113, 0.1);
		border-radius: 0.35rem;
	}

	.unknown-field {
		color: #f87171;
		font-size: 0.85rem;
		margin: 0;
	}

	.form-actions {
		display: flex;
		justify-content: flex-end;
	}

	.submit-button {
		border: 1px solid transparent;
		border-radius: 0.5rem;
		background: var(--color-accent, #6366f1);
		color: white;
		cursor: pointer;
		font-size: 0.9rem;
		font-weight: 600;
		padding: 0.65rem 1.15rem;
	}

	.submit-button:hover:not(:disabled) {
		background: #4f46e5;
	}

	.submit-button.disabled,
	.submit-button:disabled {
		cursor: not-allowed;
		opacity: 0.55;
	}
</style>
