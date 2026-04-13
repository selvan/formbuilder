<script lang="ts">
	import type {
		FieldData,
		TextFieldData,
		NumberFieldData,
		TextareaFieldData,
		CheckboxFieldData,
		RadioFieldData,
		SelectFieldData,
		NameFieldData,
		DateFieldData,
		FileFieldData,
		AddressFieldData,
		EmailFieldData,
		TimeFieldData,
		WebsiteFieldData,
		PhoneFieldData,
		SignatureFieldData,
		FieldSize,
		FieldLayout,
		Choice
	} from '$lib/types';
	import { countries } from '$lib/data/countries';
	import LabelSetting from './settings/LabelSetting.svelte';
	import PredefinedValueSetting from './settings/PredefinedValueSetting.svelte';
	import FieldSizeSetting from './settings/FieldSizeSetting.svelte';
	import FieldLayoutSetting from './settings/FieldLayoutSetting.svelte';
	import OptionsSetting from './settings/OptionsSetting.svelte';
	import RangeSetting from './settings/RangeSetting.svelte';
	import ChoicesSetting from './settings/ChoicesSetting.svelte';
	import SelectSetting from './settings/SelectSetting.svelte';

	let {
		data,
		onupdate
	}: {
		data: FieldData;
		onupdate: (data: FieldData) => void;
	} = $props();

	// Helper to produce an updated copy with one key changed
	function patch<K extends keyof FieldData>(key: K, value: FieldData[K]) {
		onupdate({ ...data, [key]: value } as FieldData);
	}
</script>

<form class="settings-form" onsubmit={(e) => e.preventDefault()}>
	<!-- Label — all field types have this -->
	<LabelSetting label={data.label_text} onchange={(v) => patch('label_text', v)} />

	<!-- Predefined value — text, number, textarea, email, website -->
	{#if data.type === 'text' || data.type === 'number' || data.type === 'textarea' || data.type === 'email' || data.type === 'website'}
		<PredefinedValueSetting
			value={(data as TextFieldData | NumberFieldData | TextareaFieldData | EmailFieldData | WebsiteFieldData).default_text}
			onchange={(v) => patch('default_text' as keyof FieldData, v as never)}
		/>
	{/if}

	<!-- Field size — text, number, textarea, select, email, website -->
	{#if data.type === 'text' || data.type === 'number' || data.type === 'textarea' || data.type === 'select' || data.type === 'email' || data.type === 'website'}
		<FieldSizeSetting
			value={(data as TextFieldData | NumberFieldData | TextareaFieldData | SelectFieldData | EmailFieldData | WebsiteFieldData).field_size}
			onchange={(v: FieldSize) => patch('field_size' as keyof FieldData, v as never)}
		/>
	{/if}

	<!-- Field layout — checkbox, radio -->
	{#if data.type === 'checkbox' || data.type === 'radio'}
		<FieldLayoutSetting
			value={(data as CheckboxFieldData | RadioFieldData).field_layout}
			onchange={(v: FieldLayout) => patch('field_layout' as keyof FieldData, v as never)}
		/>
	{/if}

	<!-- Name format -->
	{#if data.type === 'name'}
		<SelectSetting
			label="Name Format"
			value={(data as NameFieldData).name_format}
			options={[
				{ val: 'normal', text: 'Normal' },
				{ val: 'extended', text: 'Extended' }
			]}
			onchange={(v) => patch('name_format' as keyof FieldData, v as never)}
		/>
	{/if}

	<!-- Date format -->
	{#if data.type === 'date'}
		<SelectSetting
			label="Date Format"
			value={(data as DateFieldData).date_format}
			options={[
				{ val: 'mm/dd/yyyy', text: 'MM/DD/YYYY' },
				{ val: 'dd/mm/yyyy', text: 'DD/MM/YYYY' }
			]}
			onchange={(v) => patch('date_format' as keyof FieldData, v as never)}
		/>
	{/if}

	<!-- Phone format -->
	{#if data.type === 'phone'}
		<SelectSetting
			label="Phone Format"
			value={(data as PhoneFieldData).phone_format}
			options={[
				{ val: 'international', text: 'International' },
				{ val: 'other', text: '###-###-###' }
			]}
			onchange={(v) => patch('phone_format' as keyof FieldData, v as never)}
		/>
	{/if}

	<!-- Options (required) — all fields have required -->
	<OptionsSetting
		required={data.required}
		onRequiredChange={(v) => patch('required', v)}
	/>

	<!-- Range — text, number, textarea -->
	{#if data.type === 'text'}
		{@const d = data as TextFieldData}
		<RangeSetting
			min={d.range_min}
			max={d.range_max}
			rangeType={d.range_type}
			types={['characters', 'words']}
			onMinChange={(v) => patch('range_min' as keyof FieldData, v as never)}
			onMaxChange={(v) => patch('range_max' as keyof FieldData, v as never)}
			onTypeChange={(v) => patch('range_type' as keyof FieldData, v as never)}
		/>
	{:else if data.type === 'number'}
		{@const d = data as NumberFieldData}
		<RangeSetting
			min={d.range_min}
			max={d.range_max}
			rangeType={d.range_type}
			types={['value', 'digits']}
			onMinChange={(v) => patch('range_min' as keyof FieldData, v as never)}
			onMaxChange={(v) => patch('range_max' as keyof FieldData, v as never)}
			onTypeChange={(v) => patch('range_type' as keyof FieldData, v as never)}
		/>
	{:else if data.type === 'textarea'}
		{@const d = data as TextareaFieldData}
		<RangeSetting
			min={d.range_min}
			max={d.range_max}
			rangeType={d.range_type}
			types={['characters', 'words']}
			onMinChange={(v) => patch('range_min' as keyof FieldData, v as never)}
			onMaxChange={(v) => patch('range_max' as keyof FieldData, v as never)}
			onTypeChange={(v) => patch('range_type' as keyof FieldData, v as never)}
		/>
	{/if}

	<!-- Choices — checkbox -->
	{#if data.type === 'checkbox'}
		<ChoicesSetting
			choices={(data as CheckboxFieldData).checkboxes}
			radio={false}
			onchange={(v: Choice[]) => patch('checkboxes' as keyof FieldData, v as never)}
		/>
	{/if}

	<!-- Choices — radio -->
	{#if data.type === 'radio'}
		<ChoicesSetting
			choices={(data as RadioFieldData).radios}
			radio={true}
			onchange={(v: Choice[]) => patch('radios' as keyof FieldData, v as never)}
		/>
	{/if}

	<!-- Choices — select -->
	{#if data.type === 'select'}
		<ChoicesSetting
			choices={(data as SelectFieldData).options}
			radio={true}
			onchange={(v: Choice[]) => patch('options' as keyof FieldData, v as never)}
		/>
	{/if}

	<!-- Country — address -->
	{#if data.type === 'address'}
		<SelectSetting
			label="Default Country"
			value={(data as AddressFieldData).country}
			optgroups={countries}
			onchange={(v) => patch('country' as keyof FieldData, v as never)}
		/>
	{/if}
</form>

<style>
	.settings-form {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}
</style>
