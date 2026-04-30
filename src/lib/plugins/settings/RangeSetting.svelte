<script lang="ts">
	let {
		min = null as number | null,
		max = null as number | null,
		rangeType = '',
		types = [] as string[],
		onMinChange,
		onMaxChange,
		onTypeChange
	}: {
		min: number | null;
		max: number | null;
		rangeType: string;
		types: string[];
		onMinChange: (value: number | null) => void;
		onMaxChange: (value: number | null) => void;
		onTypeChange: (value: string) => void;
	} = $props();

	function handleNumberInput(callback: (v: number | null) => void) {
		return (e: Event) => {
			const val = (e.target as HTMLInputElement).value;
			const num = parseInt(val, 10);
			callback(isNaN(num) ? null : num);
		};
	}

	function capitalize(s: string): string {
		return s.charAt(0).toUpperCase() + s.slice(1);
	}
</script>

<div class="setting-row">
	<label class="setting-label">Range</label>
	<div class="setting-control">
		<div class="range-fields">
			<div class="range-field">
				<label class="range-sublabel">Min</label>
				<input
					type="text"
					class="range-input"
					value={min ?? ''}
					oninput={handleNumberInput(onMinChange)}
				/>
			</div>
			<div class="range-field">
				<label class="range-sublabel">Max</label>
				<input
					type="text"
					class="range-input"
					value={max ?? ''}
					oninput={handleNumberInput(onMaxChange)}
				/>
			</div>
			<div class="range-field range-field-wide">
				<label class="range-sublabel">Format</label>
				<select
					class="range-select"
					value={rangeType}
					onchange={(e) => onTypeChange((e.target as HTMLSelectElement).value)}
				>
					{#each types as t}
						<option value={t}>{capitalize(t)}</option>
					{/each}
				</select>
			</div>
		</div>
	</div>
</div>

<style>
	.setting-row {
		display: flex;
		align-items: flex-start;
		gap: 1rem;
		padding: 0.5rem 0;
	}
	.setting-label {
		min-width: 8rem;
		font-weight: 500;
		font-size: 0.85rem;
		color: var(--color-label, #94a3b8);
		padding-top: 0.5rem;
	}
	.setting-control {
		flex: 1;
	}
	.range-fields {
		display: flex;
		gap: 0.75rem;
	}
	.range-field {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}
	.range-field-wide {
		flex: 1.3;
	}
	.range-sublabel {
		font-size: 0.75rem;
		color: var(--color-label, #94a3b8);
	}
	.range-input,
	.range-select {
		width: 100%;
		padding: 0.4rem 0.6rem;
		border: 1px solid var(--color-border, #334155);
		border-radius: 0.5rem;
		background: var(--color-input-bg, #1e293b);
		color: var(--color-input-text, #e2e8f0);
		font-size: 0.8rem;
		transition: border-color 0.2s;
	}
	.range-input:focus,
	.range-select:focus {
		outline: none;
		border-color: var(--color-accent, #6366f1);
		box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.15);
	}
</style>
