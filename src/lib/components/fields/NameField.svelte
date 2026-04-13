<script lang="ts">
	import type { NameFieldData } from '$lib/types';

	let { data }: { data: NameFieldData } = $props();
</script>

<div class="field-preview">
	<label class="field-label">
		{data.label_text}
		{#if data.required}<span class="required">*</span>{/if}
	</label>
	<div class="name-fields">
		{#if data.name_format === 'extended'}
			<div class="name-col name-col-sm">
				<input type="text" class="name-input" readonly />
				<span class="name-sublabel">Title</span>
			</div>
		{/if}
		<div class="name-col">
			<input type="text" class="name-input" readonly />
			<span class="name-sublabel">First</span>
		</div>
		<div class="name-col">
			<input type="text" class="name-input" readonly />
			<span class="name-sublabel">Last</span>
		</div>
		{#if data.name_format === 'extended'}
			<div class="name-col name-col-sm">
				<input type="text" class="name-input" readonly />
				<span class="name-sublabel">Suffix</span>
			</div>
		{/if}
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
	.name-fields {
		display: flex;
		gap: 0.75rem;
	}
	.name-col {
		flex: 2;
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}
	.name-col-sm {
		flex: 1;
	}
	.name-input {
		padding: 0.5rem 0.75rem;
		border: 1px solid var(--color-border, #334155);
		border-radius: 0.5rem;
		background: var(--color-input-bg, #1e293b);
		color: var(--color-input-text, #e2e8f0);
		font-size: 0.875rem;
		width: 100%;
		box-sizing: border-box;
	}
	.name-sublabel {
		font-size: 0.75rem;
		color: var(--color-label, #94a3b8);
	}
</style>
