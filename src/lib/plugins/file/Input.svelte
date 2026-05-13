<script lang="ts">
	import type { FileFieldSpec } from './types';

	let {
		spec,
		userValue,
		error = '',
		onchange
	}: {
		spec: FileFieldSpec;
		userValue?: File | { file_name?: string } | string;
		error?: string;
		onchange: (value: any) => void;
	} = $props();

	let fileName = $derived(
		userValue instanceof File
			? userValue.name
			: typeof userValue === 'object'
				? userValue?.file_name || ''
				: userValue || ''
	);

	function handleChange(e: Event) {
		const target = e.target as HTMLInputElement;
		const file = target.files?.[0] || null;
		fileName = file?.name || '';
		onchange(file);
	}
</script>

<div class="field-instance">
	{#if error}
		<p class="error-message">{error}</p>
	{/if}
	<input
		id="field{spec.id}"
		type="file"
		class="field-file"
		name="field{spec.id}"
		onchange={handleChange}
	/>
	{#if fileName}
		<p class="file-name">{fileName}</p>
	{/if}
</div>

<style>
	.field-instance {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
	.error-message {
		color: #f87171;
		font-size: 0.8rem;
		margin: 0;
		padding: 0.25rem 0.5rem;
		background: rgba(248, 113, 113, 0.1);
		border-radius: 0.25rem;
	}
	.field-file {
		padding: 0.5rem 0.75rem;
		border: 1px solid var(--color-border, #334155);
		border-radius: 0.5rem;
		background: var(--color-input-bg, #1e293b);
		color: var(--color-input-text, #e2e8f0);
		font-size: 0.875rem;
		max-width: 20rem;
	}
	.file-name {
		color: var(--color-label, #94a3b8);
		font-size: 0.8rem;
		margin: 0;
	}
</style>
