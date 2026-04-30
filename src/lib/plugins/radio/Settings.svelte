<script lang="ts">
	import type { RadioFieldData } from './types';
	import FieldLayoutSetting from '$lib/plugins/settings/FieldLayoutSetting.svelte';
	import ChoicesSetting from '$lib/plugins/settings/ChoicesSetting.svelte';

	let { data, onupdate }: { data: RadioFieldData; onupdate: (data: RadioFieldData) => void } = $props();

	function patch<K extends keyof RadioFieldData>(key: K, value: RadioFieldData[K]) {
		onupdate({ ...data, [key]: value });
	}
</script>

<FieldLayoutSetting value={data.field_layout} onchange={(v) => patch('field_layout', v)} />
<ChoicesSetting choices={data.radios} radio={true} onchange={(v) => patch('radios', v)} />