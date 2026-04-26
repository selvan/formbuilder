<script lang="ts">
	import type { CheckboxFieldData } from './types';
	import FieldLayoutSetting from '$lib/components/settings/FieldLayoutSetting.svelte';
	import ChoicesSetting from '$lib/components/settings/ChoicesSetting.svelte';

	let { data, onupdate }: { data: CheckboxFieldData; onupdate: (data: CheckboxFieldData) => void } = $props();

	function patch<K extends keyof CheckboxFieldData>(key: K, value: CheckboxFieldData[K]) {
		onupdate({ ...data, [key]: value });
	}
</script>

<FieldLayoutSetting value={data.field_layout} onchange={(v) => patch('field_layout', v)} />
<ChoicesSetting choices={data.checkboxes} radio={false} onchange={(v) => patch('checkboxes', v)} />