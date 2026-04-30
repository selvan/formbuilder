<script lang="ts">
	import type { RadioFieldSpec } from './types';
	import FieldLayoutSetting from '$lib/plugins/settings/FieldLayoutSetting.svelte';
	import ChoicesSetting from '$lib/plugins/settings/ChoicesSetting.svelte';

	let { data, onupdate }: { data: RadioFieldSpec; onupdate: (data: RadioFieldSpec) => void } =
		$props();

	function patch<K extends keyof RadioFieldSpec>(key: K, value: RadioFieldSpec[K]) {
		onupdate({ ...data, [key]: value });
	}
</script>

<FieldLayoutSetting value={data.field_layout} onchange={(v) => patch('field_layout', v)} />
<ChoicesSetting choices={data.radios} radio={true} onchange={(v) => patch('radios', v)} />
