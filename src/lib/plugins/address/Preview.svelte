<script lang="ts">
	import type { AddressFieldData } from './types';

	let { data }: { data: AddressFieldData } = $props();
</script>

<div class="field-preview">
	<label class="field-label">
		{data.label_text}
		{#if data.required}<span class="required">*</span>{/if}
	</label>
	<div class="address-fields">
		<div class="address-row">
			<div class="address-col full">
				<input type="text" class="addr-input" />
				<span class="addr-sublabel">Street Address</span>
			</div>
		</div>
		<div class="address-row">
			<div class="address-col full">
				<input type="text" class="addr-input" />
				<span class="addr-sublabel">Address Line 2</span>
			</div>
		</div>
		<div class="address-row two-col">
			<div class="address-col">
				<input type="text" class="addr-input" />
				<span class="addr-sublabel">City</span>
			</div>
			<div class="address-col">
				<input type="text" class="addr-input" />
				<span class="addr-sublabel">State / Province / Region</span>
			</div>
		</div>
		<div class="address-row two-col">
			<div class="address-col">
				<input type="text" class="addr-input" />
				<span class="addr-sublabel">Postal / Zip Code</span>
			</div>
			<div class="address-col">
				<select class="addr-input">
					<option>{data.country || ''}</option>
				</select>
				<span class="addr-sublabel">Country</span>
			</div>
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
