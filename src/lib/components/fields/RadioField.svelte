<script lang="ts">
	import type { RadioFieldData } from '$lib/types';

	let { data }: { data: RadioFieldData } = $props();
</script>

<div class="field-preview">
	<label class="field-label">
		{data.label_text}
		{#if data.required}<span class="required">*</span>{/if}
	</label>
	<div class="radio-group layout-{data.field_layout}">
		{#each data.radios as item}
			<div class="radio-item">
				<input type="radio" name="radio-{data.id}" checked={item.checked} disabled />
				<label>{item.text}</label>
			</div>
		{/each}
	</div>
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
	.radio-group {
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
	}
	.radio-group.layout-two_columns {
		display: grid;
		grid-template-columns: 1fr 1fr;
	}
	.radio-group.layout-three_columns {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
	}
	.radio-group.layout-side_by_side {
		flex-direction: row;
		flex-wrap: wrap;
		gap: 1rem;
	}
	.radio-item {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.875rem;
		color: var(--color-input-text, #e2e8f0);
	}
	.radio-item input {
		accent-color: var(--color-accent, #6366f1);
	}
</style>
