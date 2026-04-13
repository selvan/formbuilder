<script lang="ts">
	let {
		label = '',
		value = '',
		options = [] as { val: string; text: string }[],
		optgroups = null as Record<string, string[]> | null,
		onchange
	}: {
		label: string;
		value: string;
		options?: { val: string; text: string }[];
		optgroups?: Record<string, string[]> | null;
		onchange: (value: string) => void;
	} = $props();

	function handleChange(e: Event) {
		onchange((e.target as HTMLSelectElement).value);
	}
</script>

<div class="setting-row">
	<label class="setting-label">{label}</label>
	<div class="setting-control">
		<select class="setting-select" {value} onchange={handleChange}>
			{#if optgroups}
				<option value={value}>{value || '-- Select --'}</option>
				{#each Object.entries(optgroups) as [group, values]}
					<optgroup label={group}>
						{#each values as v}
							<option value={v}>{v}</option>
						{/each}
					</optgroup>
				{/each}
			{:else}
				{#each options as opt}
					<option value={opt.val}>{opt.text}</option>
				{/each}
			{/if}
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
