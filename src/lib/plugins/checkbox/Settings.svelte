<script lang="ts">
	import type { CheckboxFieldSpec } from './types';
	import FieldLayoutSetting from '$lib/plugins/settings/FieldLayoutSetting.svelte';
	import ChoicesSetting from '$lib/plugins/settings/ChoicesSetting.svelte';

	let { data, onupdate }: { data: CheckboxFieldSpec; onupdate: (data: CheckboxFieldSpec) => void } =
		$props();

	function patch<K extends keyof CheckboxFieldSpec>(key: K, value: CheckboxFieldSpec[K]) {
		onupdate({ ...data, [key]: value });
	}
</script>

<FieldLayoutSetting value={data.field_layout} onchange={(v) => patch('field_layout', v)} />
<ChoicesSetting choices={data.checkboxes} radio={false} onchange={(v) => patch('checkboxes', v)} />
