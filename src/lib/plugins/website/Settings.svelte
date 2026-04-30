<script lang="ts">
	import type { WebsiteFieldData } from './types';
	import PredefinedValueSetting from '$lib/plugins/settings/PredefinedValueSetting.svelte';
	import FieldSizeSetting from '$lib/plugins/settings/FieldSizeSetting.svelte';

	let { data, onupdate }: { data: WebsiteFieldData; onupdate: (data: WebsiteFieldData) => void } = $props();

	function patch<K extends keyof WebsiteFieldData>(key: K, value: WebsiteFieldData[K]) {
		onupdate({ ...data, [key]: value });
	}
</script>

<PredefinedValueSetting value={data.default_text} onchange={(v) => patch('default_text', v)} />
<FieldSizeSetting value={data.field_size} onchange={(v) => patch('field_size', v)} />