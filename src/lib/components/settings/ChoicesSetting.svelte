<script lang="ts">
	import type { Choice } from '$lib/types';

	let {
		choices = [] as Choice[],
		radio = false,
		onchange
	}: {
		choices: Choice[];
		radio: boolean;
		onchange: (choices: Choice[]) => void;
	} = $props();

	function updateText(index: number, text: string) {
		const updated = choices.map((c, i) => (i === index ? { ...c, text } : c));
		onchange(updated);
	}

	function toggleChecked(index: number) {
		let updated: Choice[];
		if (radio) {
			// Radio: only one can be checked
			updated = choices.map((c, i) => ({ ...c, checked: i === index }));
		} else {
			updated = choices.map((c, i) => (i === index ? { ...c, checked: !c.checked } : c));
		}
		onchange(updated);
	}

	function addChoice(afterIndex: number) {
		const updated = [...choices];
		updated.splice(afterIndex + 1, 0, { text: '', checked: false });
		onchange(updated);
	}

	function removeChoice(index: number) {
		if (choices.length <= 1) return; // keep at least one
		const updated = choices.filter((_, i) => i !== index);
		onchange(updated);
	}

	function moveUp(index: number) {
		if (index <= 0) return;
		const updated = [...choices];
		[updated[index - 1], updated[index]] = [updated[index], updated[index - 1]];
		onchange(updated);
	}

	function moveDown(index: number) {
		if (index >= choices.length - 1) return;
		const updated = [...choices];
		[updated[index], updated[index + 1]] = [updated[index + 1], updated[index]];
		onchange(updated);
	}
</script>

<div class="setting-row">
	<label class="setting-label">Choices</label>
	<div class="setting-control">
		<ul class="choices-list">
			{#each choices as choice, i}
				<li class="choice-item">
					<div class="choice-main">
						{#if radio}
							<input
								type="radio"
								name="choice-radio-group"
								checked={choice.checked}
								onchange={() => toggleChecked(i)}
								class="choice-check"
							/>
						{:else}
							<input
								type="checkbox"
								checked={choice.checked}
								onchange={() => toggleChecked(i)}
								class="choice-check"
							/>
						{/if}
						<input
							type="text"
							class="choice-text"
							value={choice.text}
							oninput={(e) => updateText(i, (e.target as HTMLInputElement).value)}
							placeholder="Choice text..."
						/>
					</div>
					<div class="choice-actions">
						<button
							type="button"
							class="choice-btn choice-move"
							onclick={() => moveUp(i)}
							title="Move up"
							disabled={i === 0}
						>
							↑
						</button>
						<button
							type="button"
							class="choice-btn choice-move"
							onclick={() => moveDown(i)}
							title="Move down"
							disabled={i === choices.length - 1}
						>
							↓
						</button>
						<button
							type="button"
							class="choice-btn choice-add"
							onclick={() => addChoice(i)}
							title="Add choice after this"
						>
							+
						</button>
						<button
							type="button"
							class="choice-btn choice-remove"
							onclick={() => removeChoice(i)}
							title="Remove choice"
							disabled={choices.length <= 1}
						>
							×
						</button>
					</div>
				</li>
			{/each}
		</ul>
	</div>
</div>

<style>
	.setting-row {
		display: flex;
		align-items: flex-start;
		gap: 1rem;
		padding: 0.5rem 0;
	}
	.setting-label {
		min-width: 8rem;
		font-weight: 500;
		font-size: 0.85rem;
		color: var(--color-label, #94a3b8);
		padding-top: 0.5rem;
	}
	.setting-control {
		flex: 1;
		min-width: 0;
	}
	.choices-list {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
	.choice-item {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		padding: 0.4rem 0.5rem;
		border-radius: 0.5rem;
		background: rgba(99, 102, 241, 0.04);
		border: 1px solid rgba(99, 102, 241, 0.08);
		transition: border-color 0.15s;
	}
	.choice-item:hover {
		border-color: rgba(99, 102, 241, 0.2);
	}
	.choice-main {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}
	.choice-check {
		width: 1rem;
		height: 1rem;
		accent-color: var(--color-accent, #6366f1);
		cursor: pointer;
		flex-shrink: 0;
	}
	.choice-text {
		flex: 1;
		min-width: 0;
		padding: 0.35rem 0.5rem;
		border: 1px solid var(--color-border, #334155);
		border-radius: 0.375rem;
		background: var(--color-input-bg, #1e293b);
		color: var(--color-input-text, #e2e8f0);
		font-size: 0.8rem;
		transition: border-color 0.2s;
	}
	.choice-text:focus {
		outline: none;
		border-color: var(--color-accent, #6366f1);
		box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.15);
	}
	.choice-actions {
		display: flex;
		align-items: center;
		gap: 0.3rem;
		padding-left: 1.5rem; /* align with text input (past the checkbox) */
	}
	.choice-btn {
		width: 1.5rem;
		height: 1.5rem;
		border: none;
		border-radius: 0.3rem;
		font-size: 0.85rem;
		line-height: 1;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		transition:
			background 0.15s,
			opacity 0.15s,
			transform 0.1s;
	}
	.choice-btn:disabled {
		opacity: 0.3;
		cursor: not-allowed;
	}
	.choice-btn:not(:disabled):active {
		transform: scale(0.9);
	}
	.choice-add {
		background: rgba(99, 102, 241, 0.15);
		color: #818cf8;
	}
	.choice-add:not(:disabled):hover {
		background: rgba(99, 102, 241, 0.3);
	}
	.choice-remove {
		background: rgba(239, 68, 68, 0.12);
		color: #f87171;
	}
	.choice-remove:not(:disabled):hover {
		background: rgba(239, 68, 68, 0.25);
	}
	.choice-move {
		background: rgba(148, 163, 184, 0.1);
		color: #94a3b8;
	}
	.choice-move:not(:disabled):hover {
		background: rgba(148, 163, 184, 0.2);
		color: #cbd5e1;
	}
</style>
