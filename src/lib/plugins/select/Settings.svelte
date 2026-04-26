<script lang="ts">
	import type { SelectFieldData } from './types';
	import FieldSizeSetting from '$lib/components/settings/FieldSizeSetting.svelte';
	import ChoicesSetting from '$lib/components/settings/ChoicesSetting.svelte';

	let { data, onupdate }: { data: SelectFieldData; onupdate: (data: SelectFieldData) => void } = $props();

	function patch<K extends keyof SelectFieldData>(key: K, value: SelectFieldData[K]) {
		onupdate({ ...data, [key]: value });
	}
</script>

<FieldSizeSetting value={data.field_size} onchange={(v) => patch('field_size', v)} />
<ChoicesSetting choices={data.options} radio={true} onchange={(v) => patch('options', v)} />