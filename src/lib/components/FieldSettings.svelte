<script lang="ts">
	import type { FieldData } from '$lib/core';
	import { fieldRegistry } from '$lib/core';
	import LabelSetting from './settings/LabelSetting.svelte';
	import OptionsSetting from './settings/OptionsSetting.svelte';

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

	<!-- Options (required) — all fields have required -->
	<OptionsSetting
		required={data.required}
		onRequiredChange={(v) => patch('required', v)}
	/>

	<!-- Field specific settings via Plugin -->
	{#if fieldRegistry.get(data.type)}
		{@const plugin = fieldRegistry.get(data.type)}
		{#if plugin}
			<svelte:component this={plugin.settings} {data} {onupdate} />
		{/if}
	{:else}
		<div class="error">Unknown settings for type: {data.type}</div>
	{/if}
</form>

<style>
	.settings-form {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}
	.error {
		color: #f87171;
		font-size: 0.875rem;
		padding: 0.5rem;
	}
</style>
