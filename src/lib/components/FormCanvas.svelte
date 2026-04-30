<script lang="ts">
	import type { FieldData } from '$lib/core';
	import {
		getFormFields,
		getSelectedFieldId,
		selectField,
		addField,
		insertFieldAt,
		removeField,
		moveField,
		duplicateField
	} from '$lib/stores/formBuilder.svelte';
	import { fieldRegistry, hasFieldPluginDesignUi } from '$lib/core';
	import FieldPreview from './FieldPreview.svelte';

	let fields = $derived(getFormFields());
	let selectedId = $derived(getSelectedFieldId());

	// Drag state for reordering
	let dragSourceIndex: number | null = $state(null);
	let dropTargetIndex: number | null = $state(null);
	let isDraggingFromPalette = $state(false);

	// --- Drop zone (accepts from palette) ---
	function handleDragOver(e: DragEvent) {
		if (!e.dataTransfer) return;
		const types = e.dataTransfer.types;
		if (types.includes('application/x-field-type') || types.includes('application/x-field-reorder')) {
			e.preventDefault();
			e.dataTransfer.dropEffect = types.includes('application/x-field-type') ? 'copy' : 'move';

			if (types.includes('application/x-field-type')) {
				isDraggingFromPalette = true;
			}
		}
	}

	function handleDragLeave(e: DragEvent) {
		// Only hide when leaving the canvas entirely
		const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
		if (
			e.clientX <= rect.left ||
			e.clientX >= rect.right ||
			e.clientY <= rect.top ||
			e.clientY >= rect.bottom
		) {
			dropTargetIndex = null;
			isDraggingFromPalette = false;
		}
	}

	function handleCanvasDrop(e: DragEvent) {
		e.preventDefault();
		isDraggingFromPalette = false;
		if (!e.dataTransfer) return;

		const fieldType = e.dataTransfer.getData('application/x-field-type') as string;
		if (fieldType) {
			// Drop from palette — add at end or at target index
			if (dropTargetIndex !== null) {
				insertFieldAt(fieldType, dropTargetIndex);
			} else {
				addField(fieldType);
			}
		}
		dropTargetIndex = null;
		dragSourceIndex = null;
	}

	// --- Item drag (reordering) ---
	function handleItemDragStart(e: DragEvent, index: number) {
		if (!e.dataTransfer) return;
		e.dataTransfer.setData('application/x-field-reorder', String(index));
		e.dataTransfer.effectAllowed = 'move';
		dragSourceIndex = index;
	}

	function handleItemDragOver(e: DragEvent, index: number) {
		if (!e.dataTransfer) return;
		const types = e.dataTransfer.types;
		if (types.includes('application/x-field-reorder') || types.includes('application/x-field-type')) {
			e.preventDefault();
			e.stopPropagation();

			// Calculate if we're in the top or bottom half
			const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
			const midY = rect.top + rect.height / 2;
			const targetIdx = e.clientY < midY ? index : index + 1;
			dropTargetIndex = targetIdx;
		}
	}

	function handleItemDrop(e: DragEvent, index: number) {
		e.preventDefault();
		e.stopPropagation();
		if (!e.dataTransfer) return;

		const reorderData = e.dataTransfer.getData('application/x-field-reorder');
		const fieldType = e.dataTransfer.getData('application/x-field-type') as string;

		if (reorderData !== '') {
			const fromIndex = parseInt(reorderData, 10);
			let toIndex = dropTargetIndex !== null ? dropTargetIndex : index;
			// Adjust index if moving downward
			if (fromIndex < toIndex) toIndex--;
			moveField(fromIndex, toIndex);
		} else if (fieldType) {
			const insertAt = dropTargetIndex !== null ? dropTargetIndex : index;
			insertFieldAt(fieldType, insertAt);
		}

		dropTargetIndex = null;
		dragSourceIndex = null;
		isDraggingFromPalette = false;
	}

	function handleItemDragEnd() {
		dragSourceIndex = null;
		dropTargetIndex = null;
		isDraggingFromPalette = false;
	}

	function handleSelectField(id: string) {
		selectField(id);
	}

	function handleRemoveField(e: Event, id: string) {
		e.stopPropagation();
		removeField(id);
	}

	function handleDuplicateField(e: Event, id: string) {
		e.stopPropagation();
		duplicateField(id);
	}
</script>

<div
	class="canvas-container"
	role="region"
	aria-label="Form Canvas"
	ondragover={handleDragOver}
	ondragleave={handleDragLeave}
	ondrop={handleCanvasDrop}
>
	{#if fields.length === 0}
		<div class="canvas-empty" class:canvas-empty-active={isDraggingFromPalette}>
			<div class="empty-icon">📐</div>
			<p class="empty-title">Drop fields here</p>
			<p class="empty-subtitle">Drag field types from the left panel to start building your form</p>
		</div>
	{:else}
		<div class="canvas-fields">
			{#each fields as field, i (field.id)}
				<!-- Drop indicator before this item -->
				{#if dropTargetIndex === i}
					<div class="drop-indicator"></div>
				{/if}

				<div
					class="canvas-field-item"
					class:is-selected={selectedId === field.id}
					class:is-dragging={dragSourceIndex === i}
					draggable="true"
					role="button"
					tabindex="0"
					ondragstart={(e) => handleItemDragStart(e, i)}
					ondragover={(e) => handleItemDragOver(e, i)}
					ondrop={(e) => handleItemDrop(e, i)}
					ondragend={handleItemDragEnd}
					onclick={() => handleSelectField(field.id)}
					onkeydown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleSelectField(field.id); }}
				>
					<div class="field-drag-handle" title="Drag to reorder">
						<svg width="10" height="16" viewBox="0 0 10 16" fill="currentColor" aria-hidden="true">
							<circle cx="2" cy="2" r="1.5"/>
							<circle cx="8" cy="2" r="1.5"/>
							<circle cx="2" cy="8" r="1.5"/>
							<circle cx="8" cy="8" r="1.5"/>
							<circle cx="2" cy="14" r="1.5"/>
							<circle cx="8" cy="14" r="1.5"/>
						</svg>
					</div>

					<div class="field-type-badge">
						<span class="badge-icon">
							{#if fieldRegistry.get(field.type)}
								{@const plugin = fieldRegistry.get(field.type)}
								{#if plugin && hasFieldPluginDesignUi(plugin)}
									<svelte:component this={plugin.icon} />
								{/if}
							{/if}
						</span>
					</div>

					<div class="field-content">
						<FieldPreview data={field} />
					</div>

					<div class="field-actions">
						<button
							class="action-btn duplicate-btn"
							title="Duplicate field"
							onclick={(e) => handleDuplicateField(e, field.id)}
						>
							<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
								<rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
								<path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
							</svg>
						</button>
						<button
							class="action-btn delete-btn"
							title="Remove field"
							onclick={(e) => handleRemoveField(e, field.id)}
						>
							<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
								<line x1="18" y1="6" x2="6" y2="18"/>
								<line x1="6" y1="6" x2="18" y2="18"/>
							</svg>
						</button>
					</div>
				</div>
			{/each}

			<!-- Drop indicator at the end -->
			{#if dropTargetIndex === fields.length}
				<div class="drop-indicator"></div>
			{/if}
		</div>
	{/if}
</div>

<style>
	.canvas-container {
		min-height: 400px;
		border: 2px dashed var(--color-border, #334155);
		border-radius: 1rem;
		padding: 1rem;
		transition: border-color 0.2s, background 0.2s;
		background: linear-gradient(
			180deg,
			rgba(15, 23, 42, 0.4) 0%,
			rgba(15, 23, 42, 0.2) 100%
		);
	}

	.canvas-container:global(.dragover) {
		border-color: var(--color-accent, #6366f1);
	}

	/* Empty state */
	.canvas-empty {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		min-height: 350px;
		text-align: center;
		padding: 2rem;
		transition: opacity 0.2s;
	}

	.canvas-empty-active {
		opacity: 0.7;
	}

	.empty-icon {
		font-size: 3rem;
		margin-bottom: 1rem;
		opacity: 0.5;
	}

	.empty-title {
		font-size: 1.1rem;
		font-weight: 600;
		color: var(--color-label, #94a3b8);
		margin: 0 0 0.5rem;
	}

	.empty-subtitle {
		font-size: 0.85rem;
		color: var(--color-label, #94a3b8);
		opacity: 0.6;
		margin: 0;
		max-width: 280px;
	}

	/* Fields list */
	.canvas-fields {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	/* Drop indicator */
	.drop-indicator {
		height: 3px;
		background: linear-gradient(90deg, transparent 0%, #818cf8 20%, #a78bfa 50%, #818cf8 80%, transparent 100%);
		border-radius: 2px;
		margin: -0.125rem 0;
		animation: drop-pulse 1s ease-in-out infinite;
		box-shadow: 0 0 8px rgba(129, 140, 248, 0.4);
	}

	@keyframes drop-pulse {
		0%, 100% { opacity: 0.6; }
		50% { opacity: 1; }
	}

	/* Field item */
	.canvas-field-item {
		display: flex;
		align-items: center;
		gap: 0;
		border: 1px solid var(--color-border, #334155);
		border-radius: 0.75rem;
		background: var(--color-surface, #1e293b);
		transition:
			border-color 0.2s,
			box-shadow 0.2s,
			opacity 0.2s,
			transform 0.15s;
		cursor: pointer;
		position: relative;
		overflow: visible;
	}

	.canvas-field-item:hover {
		border-color: rgba(99, 102, 241, 0.4);
		box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
	}

	.canvas-field-item.is-selected {
		border-color: var(--color-accent, #6366f1);
		box-shadow:
			0 0 0 1px rgba(99, 102, 241, 0.2),
			0 4px 20px rgba(99, 102, 241, 0.12);
	}

	.canvas-field-item.is-dragging {
		opacity: 0.4;
		transform: scale(0.98);
	}

	/* Drag handle */
	.field-drag-handle {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 28px;
		flex-shrink: 0;
		align-self: stretch;
		cursor: grab;
		color: var(--color-label, #94a3b8);
		opacity: 0.3;
		transition: opacity 0.2s, background 0.2s;
		background: rgba(255, 255, 255, 0.02);
	}

	.canvas-field-item:hover .field-drag-handle {
		opacity: 0.7;
		background: rgba(255, 255, 255, 0.03);
	}

	.field-drag-handle:active {
		cursor: grabbing;
	}

	/* Type badge */
	.field-type-badge {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 36px;
		flex-shrink: 0;
		border-right: 1px solid rgba(255, 255, 255, 0.04);
	}

	.badge-icon {
		font-size: 0.95rem;
	}

	/* Content */
	.field-content {
		flex: 1;
		min-width: 0;
		padding: 0.5rem 0.75rem;
	}

	/* Actions */
	.field-actions {
		display: flex;
		align-items: center;
		gap: 0.15rem;
		padding: 0 0.5rem;
		opacity: 0;
		transition: opacity 0.15s;
	}

	.canvas-field-item:hover .field-actions,
	.canvas-field-item.is-selected .field-actions {
		opacity: 1;
	}

	.action-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 28px;
		height: 28px;
		border: none;
		border-radius: 0.4rem;
		background: transparent;
		color: var(--color-label, #94a3b8);
		cursor: pointer;
		transition: background 0.15s, color 0.15s;
	}

	.action-btn:hover {
		background: rgba(255, 255, 255, 0.08);
		color: var(--color-input-text, #e2e8f0);
	}

	.delete-btn:hover {
		background: rgba(248, 113, 113, 0.12);
		color: #f87171;
	}

	.duplicate-btn:hover {
		background: rgba(99, 102, 241, 0.12);
		color: #818cf8;
	}
</style>
