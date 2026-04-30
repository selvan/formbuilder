<script lang="ts">
	import type { EmailFieldSpec } from './types';
	import PredefinedValueSetting from '$lib/plugins/settings/PredefinedValueSetting.svelte';
	import FieldSizeSetting from '$lib/plugins/settings/FieldSizeSetting.svelte';

	let { data, onupdate }: { data: EmailFieldSpec; onupdate: (data: EmailFieldSpec) => void } =
		$props();

	function patch<K extends keyof EmailFieldSpec>(key: K, value: EmailFieldSpec[K]) {
		onupdate({ ...data, [key]: value });
	}
</script>

<PredefinedValueSetting value={data.default_text} onchange={(v) => patch('default_text', v)} />
<FieldSizeSetting value={data.field_size} onchange={(v) => patch('field_size', v)} />
