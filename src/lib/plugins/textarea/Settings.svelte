<script lang="ts">
	import type { TextareaFieldData } from './types';
	import PredefinedValueSetting from '$lib/components/settings/PredefinedValueSetting.svelte';
	import FieldSizeSetting from '$lib/components/settings/FieldSizeSetting.svelte';
	import RangeSetting from '$lib/components/settings/RangeSetting.svelte';

	let { data, onupdate }: { data: TextareaFieldData; onupdate: (data: TextareaFieldData) => void } = $props();

	function patch<K extends keyof TextareaFieldData>(key: K, value: TextareaFieldData[K]) {
		onupdate({ ...data, [key]: value });
	}
</script>

<PredefinedValueSetting value={data.default_text} onchange={(v) => patch('default_text', v)} />
<FieldSizeSetting value={data.field_size} onchange={(v) => patch('field_size', v)} />
<RangeSetting
	min={data.range_min} max={data.range_max} rangeType={data.range_type} types={['characters', 'words'] as const}
	onMinChange={(v) => patch('range_min', v)} onMaxChange={(v) => patch('range_max', v)} onTypeChange={(v) => patch('range_type', v as 'characters' | 'words')}
/>