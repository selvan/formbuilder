<script lang="ts">
	import type { TimeFieldData } from '$lib/types';

	let { data }: { data: TimeFieldData } = $props();
</script>

<div class="field-preview">
	<label class="field-label">
		{data.label_text}
		{#if data.required}<span class="required">*</span>{/if}
	</label>
	<div class="time-fields">
		<div class="time-col">
			<input type="text" class="time-input" readonly />
			<span class="time-sublabel">HH</span>
		</div>
		<div class="time-col">
			<input type="text" class="time-input" readonly />
			<span class="time-sublabel">MM</span>
		</div>
		<div class="time-col">
			<input type="text" class="time-input" readonly />
			<span class="time-sublabel">SS</span>
		</div>
		<div class="time-col">
			<select class="time-select" disabled>
				<option value="am" selected>AM</option>
				<option value="pm">PM</option>
			</select>
			<span class="time-sublabel">AM/PM</span>
		</div>
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
	.time-fields {
		display: flex;
		gap: 0.75rem;
		align-items: flex-start;
	}
	.time-col {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		width: 4rem;
	}
	.time-input,
	.time-select {
		padding: 0.5rem 0.5rem;
		border: 1px solid var(--color-border, #334155);
		border-radius: 0.5rem;
		background: var(--color-input-bg, #1e293b);
		color: var(--color-input-text, #e2e8f0);
		font-size: 0.875rem;
		width: 100%;
		box-sizing: border-box;
	}
	.time-sublabel {
		font-size: 0.75rem;
		color: var(--color-label, #94a3b8);
	}
</style>
