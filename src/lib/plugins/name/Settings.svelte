<script lang="ts">
	import type { NameFieldSpec } from './types';
	import type { NameFormat } from '$lib/core';
	import SelectSetting from '$lib/plugins/settings/SelectSetting.svelte';

	let { data, onupdate }: { data: NameFieldSpec; onupdate: (data: NameFieldSpec) => void } =
		$props();

	function patch<K extends keyof NameFieldSpec>(key: K, value: NameFieldSpec[K]) {
		onupdate({ ...data, [key]: value });
	}
</script>

<SelectSetting
	label="Name Format"
	value={data.name_format}
	options={[
		{ val: 'normal' as NameFormat, text: 'Normal' },
		{ val: 'extended' as NameFormat, text: 'Extended' }
	]}
	onchange={(v) => patch('name_format', v as NameFormat)}
/>
