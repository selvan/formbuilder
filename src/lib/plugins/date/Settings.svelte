<script lang="ts">
	import type { DateFieldData } from './types';
	import type { DateFormat } from '$lib/types';
	import SelectSetting from '$lib/components/settings/SelectSetting.svelte';

	let { data, onupdate }: { data: DateFieldData; onupdate: (data: DateFieldData) => void } = $props();

	function patch<K extends keyof DateFieldData>(key: K, value: DateFieldData[K]) {
		onupdate({ ...data, [key]: value });
	}
</script>

<SelectSetting
	label="Date Format"
	value={data.date_format}
	options={[ { val: 'mm/dd/yyyy' as DateFormat, text: 'MM/DD/YYYY' }, { val: 'dd/mm/yyyy' as DateFormat, text: 'DD/MM/YYYY' } ]}
	onchange={(v) => patch('date_format', v as DateFormat)}
/>