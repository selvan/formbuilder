<script lang="ts">
	import type { AddressFieldSpec } from './types';
	import { countries } from '$lib/data/countries';

	let {
		data,
		userValue,
		error = '',
		onchange
	}: {
		data: AddressFieldSpec;
		userValue?: Record<string, string>;
		error?: string;
		onchange: (value: any) => void;
	} = $props();

	let fields = $state({
		line1: userValue?.line1 || '',
		line2: userValue?.line2 || '',
		city: userValue?.city || '',
		state: userValue?.state || '',
		zip: userValue?.zip || '',
		country: userValue?.country || data.country || ''
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
	<div class="address-fields">
		<div class="address-row">
			<div class="address-col full">
				<input
					type="text"
					class="addr-input"
					name="field{data.id}[line1]"
					value={fields.line1}
					oninput={(e) => handleInput('line1', e)}
				/>
				<span class="addr-sublabel">Street Address</span>
			</div>
		</div>
		<div class="address-row">
			<div class="address-col full">
				<input
					type="text"
					class="addr-input"
					name="field{data.id}[line2]"
					value={fields.line2}
					oninput={(e) => handleInput('line2', e)}
				/>
				<span class="addr-sublabel">Address Line 2</span>
			</div>
		</div>
		<div class="address-row two-col">
			<div class="address-col">
				<input
					type="text"
					class="addr-input"
					name="field{data.id}[city]"
					value={fields.city}
					oninput={(e) => handleInput('city', e)}
				/>
				<span class="addr-sublabel">City</span>
			</div>
			<div class="address-col">
				<input
					type="text"
					class="addr-input"
					name="field{data.id}[state]"
					value={fields.state}
					oninput={(e) => handleInput('state', e)}
				/>
				<span class="addr-sublabel">State / Province / Region</span>
			</div>
		</div>
		<div class="address-row two-col">
			<div class="address-col">
				<input
					type="text"
					class="addr-input"
					name="field{data.id}[zip]"
					value={fields.zip}
					oninput={(e) => handleInput('zip', e)}
				/>
				<span class="addr-sublabel">Postal / Zip Code</span>
			</div>
			<div class="address-col">
				<select
					class="addr-input"
					name="field{data.id}[country]"
					onchange={(e) => handleInput('country', e)}
				>
					<option value="">--Select--</option>
					{#each Object.entries(countries) as [continent, countryList]}
						<optgroup label={continent}>
							{#each countryList as country}
								<option value={country} selected={fields.country === country}>
									{country}
								</option>
							{/each}
						</optgroup>
					{/each}
				</select>
				<span class="addr-sublabel">Country</span>
			</div>
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
	.address-fields {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}
	.address-row {
		display: flex;
		gap: 0.75rem;
	}
	.address-row.two-col {
		display: grid;
		grid-template-columns: 1fr 1fr;
	}
	.address-col {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}
	.address-col.full {
		width: 100%;
	}
	.addr-input {
		padding: 0.5rem 0.75rem;
		border: 1px solid var(--color-border, #334155);
		border-radius: 0.5rem;
		background: var(--color-input-bg, #1e293b);
		color: var(--color-input-text, #e2e8f0);
		font-size: 0.875rem;
		width: 100%;
		box-sizing: border-box;
	}
	.addr-sublabel {
		font-size: 0.75rem;
		color: var(--color-label, #94a3b8);
	}
</style>
