<script lang="ts">
	import type { SelectFieldSpec } from './types';
	import FieldSizeSetting from '$lib/plugins/settings/FieldSizeSetting.svelte';
	import ChoicesSetting from '$lib/plugins/settings/ChoicesSetting.svelte';

	let { data, onupdate }: { data: SelectFieldSpec; onupdate: (data: SelectFieldSpec) => void } =
		$props();

	function patch<K extends keyof SelectFieldSpec>(key: K, value: SelectFieldSpec[K]) {
		onupdate({ ...data, [key]: value });
	}
</script>

<FieldSizeSetting value={data.field_size} onchange={(v) => patch('field_size', v)} />
<ChoicesSetting choices={data.options} radio={true} onchange={(v) => patch('options', v)} />
