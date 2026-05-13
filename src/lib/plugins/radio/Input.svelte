<script lang="ts">
	import type { RadioFieldSpec } from './types';

	let {
		spec,
		userValue,
		error = '',
		onchange
	}: {
		spec: RadioFieldSpec;
		userValue?: string | number;
		error?: string;
		onchange: (value: any) => void;
	} = $props();

	function defaultValue(): string {
		if (userValue !== undefined && userValue !== null) return String(userValue);

		const checkedIndex = spec.radios.findIndex((item) => item.checked);
		return checkedIndex >= 0 ? String(checkedIndex) : '';
	}

	let value = $derived(defaultValue());

	function handleChange(e: Event) {
		const target = e.target as HTMLInputElement;
		value = target.value;
		onchange(value);
	}
</script>

<div class="field-instance">
	{#if error}
		<p class="error-message">{error}</p>
	{/if}
	<div class="radio-group layout-{spec.field_layout}">
		{#each spec.radios as item, index}
			<label class="radio-item">
				<input
					type="radio"
					class="choice-input"
					name="field{spec.id}"
					value={index}
					checked={value === String(index)}
					onchange={handleChange}
				/>
				<span>{item.text}</span>
			</label>
		{/each}
	</div>
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
	.radio-group {
		display: flex;
		flex-direction: column;
		gap: 0.45rem;
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
		color: var(--color-input-text, #e2e8f0);
		font-size: 0.875rem;
	}
	.choice-input {
		accent-color: var(--color-accent, #6366f1);
	}
</style>
