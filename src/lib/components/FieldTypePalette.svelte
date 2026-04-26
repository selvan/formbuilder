<script lang="ts">
	import { fieldRegistry } from '$lib/stores/registry.svelte';

	let {
		ondragstart,
		onclick
	}: {
		ondragstart?: (type: string) => void;
		onclick?: (type: string) => void;
	} = $props();

	function handleDragStart(e: DragEvent, type: string) {
		if (!e.dataTransfer) return;
		e.dataTransfer.setData('application/x-field-type', type);
		e.dataTransfer.effectAllowed = 'copy';
		ondragstart?.(type);
	}
	
	let plugins = $derived(fieldRegistry.getAll());
</script>

<div class="palette-grid">
	{#each plugins as plugin}
		<button
			class="palette-card"
			draggable="true"
			ondragstart={(e) => handleDragStart(e, plugin.type)}
			onclick={() => onclick?.(plugin.type)}
			title="Click or drag to add {plugin.widgetName}"
		>
			<span class="palette-icon"><svelte:component this={plugin.icon} /></span>
			<span class="palette-name">{plugin.widgetName}</span>
		</button>
	{/each}
</div>

<style>
	.palette-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 0.5rem;
	}

	.palette-card {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 0.4rem;
		padding: 0.75rem 0.4rem;
		border: 1px solid var(--color-border, #334155);
		border-radius: 0.7rem;
		background: linear-gradient(
			135deg,
			rgba(30, 41, 59, 0.8) 0%,
			rgba(15, 23, 42, 0.9) 100%
		);
		color: var(--color-input-text, #e2e8f0);
		cursor: grab;
		transition:
			border-color 0.2s,
			box-shadow 0.2s,
			transform 0.15s,
			background 0.2s;
		font-family: inherit;
		user-select: none;
	}

	.palette-card:hover {
		border-color: var(--color-accent, #6366f1);
		box-shadow:
			0 0 0 1px rgba(99, 102, 241, 0.15),
			0 4px 16px rgba(99, 102, 241, 0.1);
		transform: translateY(-1px);
		background: linear-gradient(
			135deg,
			rgba(99, 102, 241, 0.08) 0%,
			rgba(139, 92, 246, 0.05) 100%
		);
	}

	.palette-card:active {
		cursor: grabbing;
		transform: scale(0.96);
	}

	.palette-icon {
		font-size: 1.3rem;
		line-height: 1;
	}

	.palette-name {
		font-size: 0.7rem;
		font-weight: 500;
		text-align: center;
		color: var(--color-label, #94a3b8);
		line-height: 1.2;
	}
</style>
