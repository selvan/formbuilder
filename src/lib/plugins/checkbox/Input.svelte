<script lang="ts">
	import type { CheckboxFieldSpec } from './types';

	let {
		spec,
		userValue,
		error = '',
		onchange
	}: {
		spec: CheckboxFieldSpec;
		userValue?: Record<string, string> | string[] | number[];
		error?: string;
		onchange: (value: any) => void;
	} = $props();

	function checkedFromUserValue(index: number): boolean {
		if (Array.isArray(userValue)) {
			return userValue.map(String).includes(String(index));
		}

		if (userValue && typeof userValue === 'object') {
			return userValue[String(index)] !== undefined && userValue[String(index)] !== '-1';
		}

		return spec.checkboxes[index]?.checked || false;
	}

	let selected = $derived<Record<string, string>>(
		Object.fromEntries(
			spec.checkboxes.map((_, index) => [
				String(index),
				checkedFromUserValue(index) ? String(index) : '-1'
			])
		)
	);

	function handleChange(index: number, e: Event) {
		const target = e.target as HTMLInputElement;
		selected = { ...selected, [String(index)]: target.checked ? String(index) : '-1' };
		onchange(selected);
	}
</script>

<div class="field-instance">
	{#if error}
		<p class="error-message">{error}</p>
	{/if}
	<div class="checkbox-group layout-{spec.field_layout}">
		{#each spec.checkboxes as item, index}
			<label class="checkbox-item">
				<input type="hidden" name="field{spec.id}[{index}]" value="-1" />
				<input
					type="checkbox"
					class="choice-input"
					name="field{spec.id}[{index}]"
					value={index}
					checked={selected[String(index)] !== '-1'}
					onchange={(e) => handleChange(index, e)}
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
	.checkbox-group {
		display: flex;
		flex-direction: column;
		gap: 0.45rem;
	}
	.checkbox-group.layout-two_columns {
		display: grid;
		grid-template-columns: 1fr 1fr;
	}
	.checkbox-group.layout-three_columns {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
	}
	.checkbox-group.layout-side_by_side {
		flex-direction: row;
		flex-wrap: wrap;
		gap: 1rem;
	}
	.checkbox-item {
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
