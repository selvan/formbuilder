<script lang="ts">
	import type { FieldLayout } from '$lib/core';

	let {
		value = 'one_column' as FieldLayout,
		onchange
	}: { value: FieldLayout; onchange: (value: FieldLayout) => void } = $props();

	const layouts: { val: FieldLayout; text: string }[] = [
		{ val: 'one_column', text: 'One Column' },
		{ val: 'two_columns', text: 'Two Columns' },
		{ val: 'three_columns', text: 'Three Columns' },
		{ val: 'side_by_side', text: 'Side By Side' }
	];

	function handleChange(e: Event) {
		const target = e.target as HTMLSelectElement;
		onchange(target.value as FieldLayout);
	}
</script>

<div class="setting-row">
	<label class="setting-label">Field Layout</label>
	<div class="setting-control">
		<select class="setting-select" {value} onchange={handleChange}>
			{#each layouts as layout}
				<option value={layout.val} selected={layout.val === value}>{layout.text}</option>
			{/each}
		</select>
	</div>
</div>

<style>
	.setting-row {
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 0.5rem 0;
	}
	.setting-label {
		min-width: 8rem;
		font-weight: 500;
		font-size: 0.85rem;
		color: var(--color-label, #94a3b8);
	}
	.setting-control {
		flex: 1;
	}
	.setting-select {
		width: 100%;
		padding: 0.5rem 0.75rem;
		border: 1px solid var(--color-border, #334155);
		border-radius: 0.5rem;
		background: var(--color-input-bg, #1e293b);
		color: var(--color-input-text, #e2e8f0);
		font-size: 0.875rem;
		transition: border-color 0.2s;
		cursor: pointer;
	}
	.setting-select:focus {
		outline: none;
		border-color: var(--color-accent, #6366f1);
		box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.15);
	}
</style>
