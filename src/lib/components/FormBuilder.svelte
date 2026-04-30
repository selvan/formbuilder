<script lang="ts">
	import '$lib/plugins/register';
	import {
		getFormFields,
		getSelectedField,
		getSelectedFieldId,
		selectField,
		updateField,
		addField,
		setFormFields
	} from '$lib/stores/formBuilder.svelte';
	import FieldTypePalette from './FieldTypePalette.svelte';
	import FormCanvas from './FormCanvas.svelte';
	import FieldSettings from './FieldSettings.svelte';
	import type { FieldData } from '$lib/types';
	import { onMount } from 'svelte';

	let {
		formUuid = '',
		initialFields = [],
		saveAction
	}: {
		formUuid?: string;
		initialFields?: FieldData[];
		saveAction?: string;
	} = $props();

	let selectedField = $derived(getSelectedField());
	let selectedFieldId = $derived(getSelectedFieldId());
	let fields = $derived(getFormFields());
	let saveStatus = $state<'idle' | 'saving' | 'saved' | 'error'>('idle');
	let saveMessage = $state('');

	onMount(() => {
		setFormFields(initialFields);
	});

	function handleFieldUpdate(data: FieldData) {
		if (selectedFieldId) {
			updateField(selectedFieldId, data);
		}
	}

	async function handleSave() {
		if (!saveAction) return;

		saveStatus = 'saving';
		saveMessage = '';

		try {
			const response = await fetch(saveAction, {
				method: 'POST',
				headers: { 'content-type': 'application/json' },
				body: JSON.stringify({ form_uuid: formUuid, fields })
			});

			const payload = await response.json().catch(() => ({}));
			if (!response.ok) {
				throw new Error(payload?.message || 'Unable to save form design');
			}

			saveStatus = 'saved';
			saveMessage = 'Saved';
		} catch (error) {
			saveStatus = 'error';
			saveMessage = error instanceof Error ? error.message : 'Unable to save form design';
		}
	}
</script>

<div class="form-builder">
	<header class="fb-header">
		<h1 class="fb-title">Form Builder</h1>
		<p class="fb-subtitle">Drag fields from the palette to build your form</p>
		{#if saveAction}
			<div class="fb-actions">
				<button class="save-btn" type="button" disabled={saveStatus === 'saving'} onclick={handleSave}>
					{saveStatus === 'saving' ? 'Saving...' : 'Save Design'}
				</button>
				{#if saveMessage}
					<span class="save-message" class:error={saveStatus === 'error'}>{saveMessage}</span>
				{/if}
			</div>
		{/if}
	</header>

	<div class="fb-layout">
		<!-- Left: Field Type Palette -->
		<aside class="fb-palette">
			<div class="fb-panel">
				<div class="panel-header">
					<span class="panel-icon">🧩</span>
					<h2 class="panel-title">Field Types</h2>
				</div>
				<div class="panel-body">
					<FieldTypePalette onclick={(type) => addField(type)} />
				</div>
			</div>
		</aside>

		<!-- Center: Form Canvas -->
		<main class="fb-canvas">
			<div class="fb-panel fb-canvas-panel">
				<div class="panel-header">
					<span class="panel-icon">📋</span>
					<h2 class="panel-title">Form Preview</h2>
				</div>
				<div class="panel-body panel-body-canvas">
					<FormCanvas />
				</div>
			</div>
		</main>

		<!-- Right: Settings Panel -->
		<aside class="fb-settings">
			<div class="fb-panel fb-settings-panel">
				<div class="panel-header">
					<span class="panel-icon">⚙️</span>
					<h2 class="panel-title">
						{#if selectedField}
							Field Settings
						{:else}
							Settings
						{/if}
					</h2>
				</div>
				<div class="panel-body">
					{#if selectedField}
						{#key selectedFieldId}
							<FieldSettings data={selectedField} onupdate={handleFieldUpdate} />
						{/key}
					{:else}
						<div class="settings-empty">
							<div class="settings-empty-icon">👆</div>
							<p class="settings-empty-text">Click a field in the preview to configure it</p>
						</div>
					{/if}
				</div>
			</div>
		</aside>
	</div>
</div>

<style>
	:root {
		--color-bg: #0f172a;
		--color-surface: #1e293b;
		--color-border: #334155;
		--color-input-bg: #1e293b;
		--color-input-text: #e2e8f0;
		--color-label: #94a3b8;
		--color-accent: #6366f1;
	}

	.form-builder {
		min-height: 100vh;
		background: var(--color-bg);
		color: var(--color-input-text);
		font-family:
			'Inter',
			-apple-system,
			BlinkMacSystemFont,
			'Segoe UI',
			sans-serif;
		padding: 1.5rem;
	}

	.fb-header {
		margin-bottom: 1.5rem;
		text-align: center;
	}

	.fb-title {
		font-size: 1.75rem;
		font-weight: 700;
		background: linear-gradient(135deg, #818cf8, #a78bfa, #c084fc);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		margin: 0;
	}

	.fb-subtitle {
		font-size: 0.9rem;
		color: var(--color-label);
		margin: 0.4rem 0 0;
	}

	.fb-actions {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.75rem;
		margin-top: 0.85rem;
	}

	.save-btn {
		border: 1px solid transparent;
		border-radius: 0.5rem;
		background: var(--color-accent);
		color: white;
		cursor: pointer;
		font-size: 0.85rem;
		font-weight: 600;
		padding: 0.55rem 0.95rem;
	}

	.save-btn:hover:not(:disabled) {
		background: #4f46e5;
	}

	.save-btn:disabled {
		cursor: wait;
		opacity: 0.7;
	}

	.save-message {
		color: #86efac;
		font-size: 0.85rem;
	}

	.save-message.error {
		color: #f87171;
	}

	.fb-layout {
		display: grid;
		grid-template-columns: 240px 1fr 340px;
		gap: 1.25rem;
		max-width: 1440px;
		margin: 0 auto;
	}

	.fb-palette {
		position: sticky;
		top: 1.5rem;
		align-self: flex-start;
		max-height: calc(100vh - 8rem);
		overflow-y: auto;
	}

	.fb-canvas {
		min-width: 0;
	}

	.fb-settings {
		position: sticky;
		top: 1.5rem;
		align-self: flex-start;
		max-height: calc(100vh - 8rem);
		overflow-y: auto;
	}

	.fb-panel {
		background: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: 1rem;
		overflow: hidden;
		box-shadow: 0 4px 24px rgba(0, 0, 0, 0.2);
	}

	.fb-canvas-panel {
		min-height: 500px;
	}

	.fb-settings-panel {
		min-height: 300px;
	}

	.panel-header {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.85rem 1.1rem;
		border-bottom: 1px solid var(--color-border);
		background: linear-gradient(
			135deg,
			rgba(99, 102, 241, 0.06) 0%,
			rgba(139, 92, 246, 0.04) 100%
		);
	}

	.panel-icon {
		font-size: 1rem;
	}

	.panel-title {
		font-size: 0.8rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		color: var(--color-label);
		margin: 0;
	}

	.panel-body {
		padding: 1rem;
	}

	.panel-body-canvas {
		padding: 0.75rem;
	}

	/* Settings empty state */
	.settings-empty {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 3rem 1rem;
		text-align: center;
	}

	.settings-empty-icon {
		font-size: 2.5rem;
		margin-bottom: 0.75rem;
		opacity: 0.4;
	}

	.settings-empty-text {
		font-size: 0.85rem;
		color: var(--color-label);
		opacity: 0.6;
		margin: 0;
		max-width: 200px;
	}

	@media (max-width: 1100px) {
		.fb-layout {
			grid-template-columns: 200px 1fr 280px;
		}
	}

	@media (max-width: 860px) {
		.fb-layout {
			grid-template-columns: 1fr;
		}
		.fb-palette,
		.fb-settings {
			position: static;
			max-height: none;
		}
	}
</style>
