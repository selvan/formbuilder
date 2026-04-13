<script lang="ts">
	import type { FieldData } from '$lib/types';
	import TextField from './fields/TextField.svelte';
	import NumberField from './fields/NumberField.svelte';
	import TextareaField from './fields/TextareaField.svelte';
	import CheckboxField from './fields/CheckboxField.svelte';
	import RadioField from './fields/RadioField.svelte';
	import SelectField from './fields/SelectField.svelte';
	import NameField from './fields/NameField.svelte';
	import DateField from './fields/DateField.svelte';
	import FileField from './fields/FileField.svelte';
	import AddressField from './fields/AddressField.svelte';
	import EmailField from './fields/EmailField.svelte';
	import TimeField from './fields/TimeField.svelte';
	import WebsiteField from './fields/WebsiteField.svelte';
	import PhoneField from './fields/PhoneField.svelte';
	import SignatureField from './fields/SignatureField.svelte';

	let { data }: { data: FieldData } = $props();
</script>

<div class="preview-container">
	{#if data.type === 'text'}
		<TextField {data} />
	{:else if data.type === 'number'}
		<NumberField {data} />
	{:else if data.type === 'textarea'}
		<TextareaField {data} />
	{:else if data.type === 'checkbox'}
		<CheckboxField {data} />
	{:else if data.type === 'radio'}
		<RadioField {data} />
	{:else if data.type === 'select'}
		<SelectField {data} />
	{:else if data.type === 'name'}
		<NameField {data} />
	{:else if data.type === 'date'}
		<DateField {data} />
	{:else if data.type === 'file'}
		<FileField {data} />
	{:else if data.type === 'address'}
		<AddressField {data} />
	{:else if data.type === 'email'}
		<EmailField {data} />
	{:else if data.type === 'time'}
		<TimeField {data} />
	{:else if data.type === 'website'}
		<WebsiteField {data} />
	{:else if data.type === 'phone'}
		<PhoneField {data} />
	{:else if data.type === 'signature'}
		<SignatureField {data} />
	{/if}
</div>

<style>
	.preview-container {
		padding: 1.5rem;
		border: 1px solid var(--color-border, #334155);
		border-radius: 0.75rem;
		background: linear-gradient(
			135deg,
			rgba(30, 41, 59, 0.6) 0%,
			rgba(15, 23, 42, 0.8) 100%
		);
		min-height: 6rem;
	}
</style>
