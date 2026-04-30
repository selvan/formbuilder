<script lang="ts">
	import type { TextFieldSpec } from './types';
	import PredefinedValueSetting from '$lib/plugins/settings/PredefinedValueSetting.svelte';
	import FieldSizeSetting from '$lib/plugins/settings/FieldSizeSetting.svelte';
	import RangeSetting from '$lib/plugins/settings/RangeSetting.svelte';

	let { data, onupdate }: { data: TextFieldSpec; onupdate: (data: TextFieldSpec) => void } =
		$props();

	function patch<K extends keyof TextFieldSpec>(key: K, value: TextFieldSpec[K]) {
		onupdate({ ...data, [key]: value });
	}
</script>

<PredefinedValueSetting value={data.default_text} onchange={(v) => patch('default_text', v)} />
<FieldSizeSetting value={data.field_size} onchange={(v) => patch('field_size', v)} />
<RangeSetting
	min={data.range_min}
	max={data.range_max}
	rangeType={data.range_type}
	types={['characters', 'words'] as const}
	onMinChange={(v) => patch('range_min', v)}
	onMaxChange={(v) => patch('range_max', v)}
	onTypeChange={(v) => patch('range_type', v as 'characters' | 'words')}
/>
