<script lang="ts">
	import type { EmailFieldData } from './types';
	import PredefinedValueSetting from '$lib/plugins/settings/PredefinedValueSetting.svelte';
	import FieldSizeSetting from '$lib/plugins/settings/FieldSizeSetting.svelte';

	let { data, onupdate }: { data: EmailFieldData; onupdate: (data: EmailFieldData) => void } = $props();

	function patch<K extends keyof EmailFieldData>(key: K, value: EmailFieldData[K]) {
		onupdate({ ...data, [key]: value });
	}
</script>

<PredefinedValueSetting value={data.default_text} onchange={(v) => patch('default_text', v)} />
<FieldSizeSetting value={data.field_size} onchange={(v) => patch('field_size', v)} />