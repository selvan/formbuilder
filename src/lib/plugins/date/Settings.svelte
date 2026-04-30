<script lang="ts">
	import type { DateFieldSpec } from './types';
	import type { DateFormat } from '$lib/core';
	import SelectSetting from '$lib/plugins/settings/SelectSetting.svelte';

	let { data, onupdate }: { data: DateFieldSpec; onupdate: (data: DateFieldSpec) => void } =
		$props();

	function patch<K extends keyof DateFieldSpec>(key: K, value: DateFieldSpec[K]) {
		onupdate({ ...data, [key]: value });
	}
</script>

<SelectSetting
	label="Date Format"
	value={data.date_format}
	options={[
		{ val: 'mm/dd/yyyy' as DateFormat, text: 'MM/DD/YYYY' },
		{ val: 'dd/mm/yyyy' as DateFormat, text: 'DD/MM/YYYY' }
	]}
	onchange={(v) => patch('date_format', v as DateFormat)}
/>
