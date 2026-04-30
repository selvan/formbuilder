<script lang="ts">
	import type { FieldSpec } from '$lib/core';
	import { fieldRegistry, hasFieldPluginDesignUi } from '$lib/core';
	import LabelSetting from './settings/LabelSetting.svelte';
	import OptionsSetting from './settings/OptionsSetting.svelte';

	let {
		data,
		onupdate
	}: {
		data: FieldSpec;
		onupdate: (data: FieldSpec) => void;
	} = $props();

	// Helper to produce an updated copy with one key changed
	function patch<K extends keyof FieldSpec>(key: K, value: FieldSpec[K]) {
		onupdate({ ...data, [key]: value } as FieldSpec);
	}
</script>

<form class="settings-form" onsubmit={(e) => e.preventDefault()}>
	<!-- Label — all field types have this -->
	<LabelSetting label={data.label_text} onchange={(v) => patch('label_text', v)} />

	<!-- Options (required) — all fields have required -->
	<OptionsSetting required={data.required} onRequiredChange={(v) => patch('required', v)} />

	<!-- Field specific settings via Plugin -->
	{#if fieldRegistry.get(data.type)}
		{@const plugin = fieldRegistry.get(data.type)}
		{#if plugin && hasFieldPluginDesignUi(plugin)}
			<svelte:component this={plugin.settings} {data} {onupdate} />
		{:else}
			<div class="error">No design settings available for type: {data.type}</div>
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
