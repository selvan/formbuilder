<script lang="ts">
	import type { PhoneFieldData } from './types';

	let { data }: { data: PhoneFieldData } = $props();
</script>

<div class="field-preview">
	<label class="field-label" for="field-{data.id}">
		{data.label_text}
		{#if data.required}<span class="required">*</span>{/if}
	</label>
	<div class="phone-fields">
		{#if data.phone_format === 'international'}
			<input id="field-{data.id}" type="text" class="phone-input phone-full" />
		{:else}
			<div class="phone-col">
				<input type="text" class="phone-input" />
				<span class="phone-sublabel">###</span>
			</div>
			<div class="phone-col">
				<input type="text" class="phone-input" />
				<span class="phone-sublabel">###</span>
			</div>
			<div class="phone-col phone-col-sm">
				<input type="text" class="phone-input" />
				<span class="phone-sublabel">###</span>
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
	.phone-fields {
		display: flex;
		gap: 0.75rem;
		align-items: flex-start;
	}
	.phone-col {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		flex: 1;
	}
	.phone-col-sm {
		flex: 0.8;
	}
	.phone-input {
		padding: 0.5rem 0.75rem;
		border: 1px solid var(--color-border, #334155);
		border-radius: 0.5rem;
		background: var(--color-input-bg, #1e293b);
		color: var(--color-input-text, #e2e8f0);
		font-size: 0.875rem;
		width: 100%;
		box-sizing: border-box;
	}
	.phone-full {
		max-width: 20rem;
	}
	.phone-sublabel {
		font-size: 0.75rem;
		color: var(--color-label, #94a3b8);
	}
</style>
