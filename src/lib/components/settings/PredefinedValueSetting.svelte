<script lang="ts">
	let {
		value = '',
		onchange
	}: { value: string; onchange: (value: string) => void } = $props();

	function handleInput(e: Event) {
		const target = e.target as HTMLInputElement;
		onchange(target.value);
	}
</script>

<div class="setting-row">
	<label class="setting-label">Preset Value</label>
	<div class="setting-control">
		<input type="text" class="setting-input" {value} oninput={handleInput} />
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
	.setting-input {
		width: 100%;
		padding: 0.5rem 0.75rem;
		border: 1px solid var(--color-border, #334155);
		border-radius: 0.5rem;
		background: var(--color-input-bg, #1e293b);
		color: var(--color-input-text, #e2e8f0);
		font-size: 0.875rem;
		transition: border-color 0.2s;
	}
	.setting-input:focus {
		outline: none;
		border-color: var(--color-accent, #6366f1);
		box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.15);
	}
</style>
