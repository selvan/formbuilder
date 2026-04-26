<script lang="ts">
	import type { FileFieldData } from './types';

	let { data }: { data: FileFieldData } = $props();
</script>

<div class="field-preview">
	<label class="field-label" for="field-{data.id}">
		{data.label_text}
		{#if data.required}<span class="required">*</span>{/if}
	</label>
	<input id="field-{data.id}" type="file" class="field-file" />
</div>

<style>
	.field-preview {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
	.field-label {
		font-weight: 500;
		font-size: 0.9rem;
		color: var(--color-input-text, #e2e8f0);
	}
	.required {
		color: #f87171;
		margin-left: 0.2rem;
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
</style>
