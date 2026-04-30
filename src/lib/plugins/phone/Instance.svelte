<script lang="ts">
	import type { PhoneFieldSpec } from './types';

	let {
		data,
		userValue,
		error = '',
		onchange
	}: {
		data: PhoneFieldSpec;
		userValue?: Record<string, string> | string;
		error?: string;
		onchange: (value: any) => void;
	} = $props();

	// International format uses a single string; domestic uses three parts
	let international = $state(typeof userValue === 'object' ? userValue?.international || '' : '');
	let parts = $state({
		first: typeof userValue === 'object' ? userValue?.first || '' : '',
		second: typeof userValue === 'object' ? userValue?.second || '' : '',
		third: typeof userValue === 'object' ? userValue?.third || '' : ''
	});

	function handleInternational(e: Event) {
		const target = e.target as HTMLInputElement;
		international = target.value;
		onchange({ international });
	}

	function handlePart(field: string, e: Event) {
		const target = e.target as HTMLInputElement;
		parts = { ...parts, [field]: target.value };
		onchange(parts);
	}
</script>

<div class="field-instance">
	{#if error}
		<p class="error-message">{error}</p>
	{/if}
	{#if data.phone_format === 'international'}
		<input
			type="text"
			class="phone-input medium"
			name="field{data.id}[international]"
			value={international}
			oninput={handleInternational}
		/>
	{:else}
		<div class="phone-fields">
			<div class="phone-col">
				<input
					type="text"
					class="phone-input"
					name="field{data.id}[first]"
					value={parts.first}
					oninput={(e) => handlePart('first', e)}
				/>
				<span class="phone-sublabel">###</span>
			</div>
			<div class="phone-col">
				<input
					type="text"
					class="phone-input"
					name="field{data.id}[second]"
					value={parts.second}
					oninput={(e) => handlePart('second', e)}
				/>
				<span class="phone-sublabel">###</span>
			</div>
			<div class="phone-col wider">
				<input
					type="text"
					class="phone-input"
					name="field{data.id}[third]"
					value={parts.third}
					oninput={(e) => handlePart('third', e)}
				/>
				<span class="phone-sublabel">####</span>
			</div>
		</div>
	{/if}
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
	.phone-fields {
		display: flex;
		gap: 0.75rem;
		align-items: flex-start;
	}
	.phone-col {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		flex: 0 0 4rem;
	}
	.phone-col.wider {
		flex: 0 0 5rem;
	}
	.phone-input {
		padding: 0.5rem 0.75rem;
		border: 1px solid var(--color-border, #334155);
		border-radius: 0.5rem;
		background: var(--color-input-bg, #1e293b);
		color: var(--color-input-text, #e2e8f0);
		font-size: 0.875rem;
		width: 100%;
		box-sizing: border-box;
	}
	.phone-input.medium {
		max-width: 20rem;
	}
	.phone-sublabel {
		font-size: 0.75rem;
		color: var(--color-label, #94a3b8);
	}
</style>
