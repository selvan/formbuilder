<script lang="ts">
	let {
		required = false,
		showUnique = false,
		unique = false,
		onRequiredChange,
		onUniqueChange
	}: {
		required: boolean;
		showUnique?: boolean;
		unique?: boolean;
		onRequiredChange: (value: boolean) => void;
		onUniqueChange?: (value: boolean) => void;
	} = $props();
</script>

<div class="setting-row">
	<label class="setting-label">Options</label>
	<div class="setting-control">
		<label class="checkbox-label">
			<input
				type="checkbox"
				checked={required}
				onchange={(e) => onRequiredChange((e.target as HTMLInputElement).checked)}
			/>
			<span>Required</span>
		</label>
		{#if showUnique && onUniqueChange}
			<label class="checkbox-label">
				<input
					type="checkbox"
					checked={unique}
					onchange={(e) => onUniqueChange((e.target as HTMLInputElement).checked)}
				/>
				<span>No Duplicate</span>
			</label>
		{/if}
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
		padding-top: 0.25rem;
	}
	.setting-control {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
	.checkbox-label {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.875rem;
		color: var(--color-input-text, #e2e8f0);
		cursor: pointer;
	}
	.checkbox-label input[type='checkbox'] {
		width: 1rem;
		height: 1rem;
		accent-color: var(--color-accent, #6366f1);
		cursor: pointer;
	}
</style>
