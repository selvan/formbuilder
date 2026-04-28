<script lang="ts">
	import type { TextareaFieldData } from './types';

	let {
		data,
		userValue = '',
		error = '',
		onchange
	}: {
		data: TextareaFieldData;
		userValue?: string;
		error?: string;
		onchange: (value: any) => void;
	} = $props();

	let value = $state(userValue || data.default_text || '');

	function handleInput(e: Event) {
		const target = e.target as HTMLTextAreaElement;
		value = target.value;
		onchange(value);
	}
</script>

<div class="field-instance">
	{#if error}
		<p class="error-message">{error}</p>
	{/if}
	<textarea
		class="field-input {data.field_size}"
		name="field{data.id}"
		oninput={handleInput}>{value}</textarea>
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
	.field-input {
		padding: 0.5rem 0.75rem;
		border: 1px solid var(--color-border, #334155);
		border-radius: 0.5rem;
		background: var(--color-input-bg, #1e293b);
		color: var(--color-input-text, #e2e8f0);
		font-size: 0.875rem;
		width: 100%;
		box-sizing: border-box;
		min-height: 5rem;
		resize: vertical;
	}
	.field-input.small {
		max-width: 12rem;
	}
	.field-input.medium {
		max-width: 20rem;
	}
	.field-input.large {
		max-width: 100%;
	}
</style>
