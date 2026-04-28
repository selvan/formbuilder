<script lang="ts">
	import type { DateFieldData } from './types';

	let {
		data,
		userValue,
		error = '',
		onchange
	}: {
		data: DateFieldData;
		userValue?: Record<string, string>;
		error?: string;
		onchange: (value: any) => void;
	} = $props();

	// date_format is 'mm/dd/yyyy' or 'dd/mm/yyyy'
	const formatParts = data.date_format.split('/');
	const first = formatParts[0]; // 'mm' or 'dd'
	const second = formatParts[1]; // 'dd' or 'mm'

	let fields = $state({
		[first]: userValue?.[first] || '',
		[second]: userValue?.[second] || '',
		yyyy: userValue?.yyyy || ''
	});

	function handleInput(field: string, e: Event) {
		const target = e.target as HTMLInputElement;
		fields = { ...fields, [field]: target.value };
		onchange(fields);
	}
</script>

<div class="field-instance">
	{#if error}
		<p class="error-message">{error}</p>
	{/if}
	<div class="date-fields">
		<div class="date-col">
			<input
				type="text"
				class="date-input"
				name="field{data.id}[{first}]"
				value={fields[first]}
				oninput={(e) => handleInput(first, e)}
			/>
			<span class="date-sublabel">{first.toUpperCase()}</span>
		</div>
		<div class="date-col">
			<input
				type="text"
				class="date-input"
				name="field{data.id}[{second}]"
				value={fields[second]}
				oninput={(e) => handleInput(second, e)}
			/>
			<span class="date-sublabel">{second.toUpperCase()}</span>
		</div>
		<div class="date-col wider">
			<input
				type="text"
				class="date-input"
				name="field{data.id}[yyyy]"
				value={fields.yyyy}
				oninput={(e) => handleInput('yyyy', e)}
			/>
			<span class="date-sublabel">YYYY</span>
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
	.date-fields {
		display: flex;
		gap: 0.75rem;
		align-items: flex-start;
	}
	.date-col {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		flex: 0 0 4rem;
	}
	.date-col.wider {
		flex: 0 0 5rem;
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
</style>
