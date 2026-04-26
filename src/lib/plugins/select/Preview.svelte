<script lang="ts">
	import type { SelectFieldData } from './types';

	let { data }: { data: SelectFieldData } = $props();
</script>

<div class="field-preview">
	<label class="field-label" for="field-{data.id}">
		{data.label_text}
		{#if data.required}<span class="required">*</span>{/if}
	</label>
	<select id="field-{data.id}" class="field-select {data.field_size}">
		<option value="">--Select--</option>
		{#each data.options as item}
			<option value={item.text} selected={item.checked}>{item.text}</option>
		{/each}
	</select>
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
	.field-select {
		padding: 0.5rem 0.75rem;
		border: 1px solid var(--color-border, #334155);
		border-radius: 0.5rem;
		background: var(--color-input-bg, #1e293b);
		color: var(--color-input-text, #e2e8f0);
		font-size: 0.875rem;
	}
	.field-select.small {
		max-width: 12rem;
	}
	.field-select.medium {
		max-width: 20rem;
	}
	.field-select.large {
		max-width: 100%;
	}
</style>
