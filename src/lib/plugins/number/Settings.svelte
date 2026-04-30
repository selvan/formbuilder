<script lang="ts">
	import type { NumberFieldData } from './types';
	import PredefinedValueSetting from '$lib/plugins/settings/PredefinedValueSetting.svelte';
	import FieldSizeSetting from '$lib/plugins/settings/FieldSizeSetting.svelte';
	import RangeSetting from '$lib/plugins/settings/RangeSetting.svelte';

	let { data, onupdate }: { data: NumberFieldData; onupdate: (data: NumberFieldData) => void } = $props();

	function patch<K extends keyof NumberFieldData>(key: K, value: NumberFieldData[K]) {
		onupdate({ ...data, [key]: value });
	}
</script>

<PredefinedValueSetting value={data.default_text} onchange={(v) => patch('default_text', v)} />
<FieldSizeSetting value={data.field_size} onchange={(v) => patch('field_size', v)} />
<RangeSetting
	min={data.range_min} max={data.range_max} rangeType={data.range_type} types={['value', 'digits'] as const}
	onMinChange={(v) => patch('range_min', v)} onMaxChange={(v) => patch('range_max', v)} onTypeChange={(v) => patch('range_type', v as 'value' | 'digits')}
/>