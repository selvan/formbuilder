<script lang="ts">
	import DocumentInstance from '$lib/components/DocumentInstance.svelte';

	let { data } = $props();
	let submitStatus = $state<'idle' | 'submitting' | 'submitted' | 'error'>('idle');
	let submitMessage = $state('');

	function normalizeFormData(form: HTMLFormElement) {
		const output: Record<string, unknown> = {};
		const formData = new FormData(form);

		for (const [key, value] of formData.entries()) {
			const normalized =
				value instanceof File
					? value.name
						? { name: value.name, size: value.size, type: value.type }
						: null
					: value;

			if (normalized === null) continue;

			if (key in output) {
				const existing = output[key];
				output[key] = Array.isArray(existing) ? [...existing, normalized] : [existing, normalized];
			} else {
				output[key] = normalized;
			}
		}

		return output;
	}

	async function handleSubmit(_values: Record<string, unknown>, event: SubmitEvent) {
		event.preventDefault();
		const form = event.currentTarget as HTMLFormElement;

		submitStatus = 'submitting';
		submitMessage = '';

		try {
			const response = await fetch(`/instance/${data.form_uuid}`, {
				method: 'POST',
				headers: { 'content-type': 'application/json' },
				body: JSON.stringify({
					form_uuid: data.form_uuid,
					values: normalizeFormData(form)
				})
			});

			const payload = await response.json().catch(() => ({}));
			if (!response.ok) {
				throw new Error(payload?.message || 'Unable to submit form');
			}

			submitStatus = 'submitted';
			submitMessage = 'Submitted';
		} catch (error) {
			submitStatus = 'error';
			submitMessage = error instanceof Error ? error.message : 'Unable to submit form';
		}
	}
</script>

<svelte:head>
	<title>Submit Form - KanbanERP</title>
</svelte:head>

<main class="instance-page">
	{#if submitMessage}
		<p class="submit-message" class:error={submitStatus === 'error'}>{submitMessage}</p>
	{/if}
	<DocumentInstance document={data.document} onsubmit={handleSubmit} disabled={submitStatus === 'submitting'} />
</main>

<style>
	.instance-page {
		min-height: 100vh;
		background: var(--color-bg, #0f172a);
		padding: 1.5rem;
	}

	.submit-message {
		color: #86efac;
		font-size: 0.9rem;
		font-weight: 600;
		margin: 0 auto 1rem;
		max-width: 760px;
	}

	.submit-message.error {
		color: #f87171;
	}
</style>
