<script lang="ts">
	import type { TimeFieldSpec } from './types';

	let {
		spec,
		userValue,
		error = '',
		onchange
	}: {
		spec: TimeFieldSpec;
		userValue?: Record<string, string>;
		error?: string;
		onchange: (value: any) => void;
	} = $props();

	let fields = $derived({
		h: userValue?.h || '',
		m: userValue?.m || '',
		s: userValue?.s || '',
		ampm: userValue?.ampm || 'am'
	});

	function handleInput(field: string, e: Event) {
		const target = e.target as HTMLInputElement | HTMLSelectElement;
		fields = { ...fields, [field]: target.value };
		onchange(fields);
	}
</script>

<div class="field-instance">
	{#if error}
		<p class="error-message">{error}</p>
	{/if}
	<div class="time-fields">
		<div class="time-col">
			<input
				type="text"
				class="time-input"
				name="field{spec.id}[h]"
				value={fields.h}
				oninput={(e) => handleInput('h', e)}
			/>
			<span class="time-sublabel">HH</span>
		</div>
		<div class="time-col">
			<input
				type="text"
				class="time-input"
				name="field{spec.id}[m]"
				value={fields.m}
				oninput={(e) => handleInput('m', e)}
			/>
			<span class="time-sublabel">MM</span>
		</div>
		<div class="time-col">
			<input
				type="text"
				class="time-input"
				name="field{spec.id}[s]"
				value={fields.s}
				oninput={(e) => handleInput('s', e)}
			/>
			<span class="time-sublabel">SS</span>
		</div>
		<div class="time-col wider">
			<select
				class="time-input"
				name="field{spec.id}[ampm]"
				onchange={(e) => handleInput('ampm', e)}
			>
				<option value="am" selected={fields.ampm === 'am'}>AM</option>
				<option value="pm" selected={fields.ampm === 'pm'}>PM</option>
			</select>
			<span class="time-sublabel">AM/PM</span>
		</div>
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
	.time-fields {
		display: flex;
		gap: 0.75rem;
		align-items: flex-start;
	}
	.time-col {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		flex: 0 0 4rem;
	}
	.time-col.wider {
		flex: 0 0 5rem;
	}
	.time-input {
		padding: 0.5rem 0.75rem;
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
