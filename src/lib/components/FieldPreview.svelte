<script lang="ts">
	import type { FieldData } from '$lib/core';
	import { fieldRegistry, hasFieldPluginDesignUi } from '$lib/core';

	let { data }: { data: FieldData } = $props();
</script>

<div class="preview-container">
	{#if fieldRegistry.get(data.type)}
		{@const plugin = fieldRegistry.get(data.type)}
		{#if plugin && hasFieldPluginDesignUi(plugin)}
			<svelte:component this={plugin.preview} {data} />
		{:else}
			<div class="error">No preview available for field type: {data.type}</div>
		{/if}
	{:else}
		<div class="error">Unknown field type: {data.type}</div>
	{/if}
</div>

<style>
	.preview-container {
		width: 100%;
	}
	.error {
		color: #f87171;
		font-size: 0.85rem;
	}
</style>
