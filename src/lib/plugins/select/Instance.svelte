<script lang="ts">
	import type { SelectFieldSpec } from './types';

	let {
		data,
		userValue,
		error = '',
		onchange
	}: {
		data: SelectFieldSpec;
		userValue?: string | number;
		error?: string;
		onchange: (value: any) => void;
	} = $props();

	function defaultValue(): string {
		if (userValue !== undefined && userValue !== null) return String(userValue);

		const checkedIndex = data.options.findIndex((item) => item.checked);
		return checkedIndex >= 0 ? String(checkedIndex) : '';
	}

	let value = $state(defaultValue());

	function handleChange(e: Event) {
		const target = e.target as HTMLSelectElement;
		value = target.value;
		onchange(value);
	}
</script>

<div class="field-instance">
	{#if error}
		<p class="error-message">{error}</p>
	{/if}
	<select
		class="field-select {data.field_size}"
		name="field{data.id}"
		{value}
		onchange={handleChange}
	>
		<option value="">--Select--</option>
		{#each data.options as item, index}
			<option value={index}>{item.text}</option>
		{/each}
	</select>
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
	.field-select {
		padding: 0.5rem 0.75rem;
		border: 1px solid var(--color-border, #334155);
		border-radius: 0.5rem;
		background: var(--color-input-bg, #1e293b);
		color: var(--color-input-text, #e2e8f0);
		font-size: 0.875rem;
		width: 100%;
		box-sizing: border-box;
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
