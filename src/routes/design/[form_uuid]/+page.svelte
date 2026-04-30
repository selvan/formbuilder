<script lang="ts">
	import FormBuilder from '$lib/components/FormBuilder.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>Edit Form Design - KanbanERP</title>
</svelte:head>

<FormBuilder
	formUuid={data.form_uuid}
	initialFields={data.fields}
	saveAction={`/design/${data.form_uuid}`}
/>
