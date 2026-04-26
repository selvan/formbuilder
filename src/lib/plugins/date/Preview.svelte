<script lang="ts">
	import type { DateFieldData } from './types';

	let { data }: { data: DateFieldData } = $props();

	$effect(() => {
		// Parse date format parts
	});

	function getDateParts(): string[] {
		return data.date_format.split('/');
	}
</script>

<div class="field-preview">
	<label class="field-label">
		{data.label_text}
		{#if data.required}<span class="required">*</span>{/if}
	</label>
	<div class="date-fields">
		<div class="date-col">
			<input type="text" class="date-input" />
			<span class="date-sublabel">{getDateParts()[0].toUpperCase()}</span>
		</div>
		<div class="date-col">
			<input type="text" class="date-input" />
			<span class="date-sublabel">{getDateParts()[1].toUpperCase()}</span>
		</div>
		<div class="date-col date-col-wide">
			<input type="text" class="date-input" />
			<span class="date-sublabel">YYYY</span>
		</div>
		<div class="date-icon">📅</div>
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
	.date-fields {
		display: flex;
		align-items: flex-start;
		gap: 0.75rem;
	}
	.date-col {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		width: 4rem;
	}
	.date-col-wide {
		width: 5.5rem;
	}
	.date-input {
		padding: 0.5rem 0.75rem;
		border: 1px solid var(--color-border, #334155);
		border-radius: 0.5rem;
		background: var(--color-input-bg, #1e293b);
		color: var(--color-input-text, #e2e8f0);
		font-size: 0.875rem;
		width: 100%;
		box-sizing: border-box;
	}
	.date-sublabel {
		font-size: 0.75rem;
		color: var(--color-label, #94a3b8);
	}
	.date-icon {
		font-size: 1.5rem;
		padding-top: 0.25rem;
	}
</style>
