<script lang="ts">
	import type { FieldData } from '$lib/types';
	import { fieldRegistry } from '$lib/stores/registry.svelte';

	let { data }: { data: FieldData } = $props();
</script>

<div class="preview-container">
	{#if fieldRegistry.get(data.type)}
		{@const plugin = fieldRegistry.get(data.type)}
		{#if plugin}
			<svelte:component this={plugin.preview} {data} />
		{/if}
	{:else}
		<div class="error">Unknown field type: {data.type}</div>
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
	.error {
		color: #f87171;
	}
</style>
