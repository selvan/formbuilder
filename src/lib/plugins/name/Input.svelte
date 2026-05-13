<script lang="ts">
	import type { NameFieldSpec } from './types';

	let {
		spec,
		userValue,
		error = '',
		onchange
	}: {
		spec: NameFieldSpec;
		userValue?: Record<string, string>;
		error?: string;
		onchange: (value: any) => void;
	} = $props();

	let fields = $derived({
		title: userValue?.title || '',
		first: userValue?.first || '',
		last: userValue?.last || '',
		suffix: userValue?.suffix || ''
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
	<div class="name-fields">
		{#if spec.name_format === 'extended'}
			<div class="name-col small">
				<input
					type="text"
					class="name-input"
					name="field{spec.id}[title]"
					value={fields.title}
					oninput={(e) => handleInput('title', e)}
				/>
				<span class="name-sublabel">Title</span>
			</div>
		{/if}
		<div class="name-col">
			<input
				type="text"
				class="name-input"
				name="field{spec.id}[first]"
				value={fields.first}
				oninput={(e) => handleInput('first', e)}
			/>
			<span class="name-sublabel">First</span>
		</div>
		<div class="name-col">
			<input
				type="text"
				class="name-input"
				name="field{spec.id}[last]"
				value={fields.last}
				oninput={(e) => handleInput('last', e)}
			/>
			<span class="name-sublabel">Last</span>
		</div>
		{#if spec.name_format === 'extended'}
			<div class="name-col small">
				<input
					type="text"
					class="name-input"
					name="field{spec.id}[suffix]"
					value={fields.suffix}
					oninput={(e) => handleInput('suffix', e)}
				/>
				<span class="name-sublabel">Suffix</span>
			</div>
		{/if}
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
	.name-fields {
		display: flex;
		gap: 0.75rem;
		align-items: flex-start;
	}
	.name-col {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		flex: 1;
	}
	.name-col.small {
		flex: 0 0 5rem;
	}
	.name-input {
		padding: 0.5rem 0.75rem;
		border: 1px solid var(--color-border, #334155);
		border-radius: 0.5rem;
		background: var(--color-input-bg, #1e293b);
		color: var(--color-input-text, #e2e8f0);
		font-size: 0.875rem;
		width: 100%;
		box-sizing: border-box;
	}
	.name-sublabel {
		font-size: 0.75rem;
		color: var(--color-label, #94a3b8);
	}
</style>
