<script lang="ts">
	import type { NameFieldData } from './types';
	import type { NameFormat } from '$lib/types';
	import SelectSetting from '$lib/components/settings/SelectSetting.svelte';

	let { data, onupdate }: { data: NameFieldData; onupdate: (data: NameFieldData) => void } = $props();

	function patch<K extends keyof NameFieldData>(key: K, value: NameFieldData[K]) {
		onupdate({ ...data, [key]: value });
	}
</script>

<SelectSetting
	label="Name Format"
	value={data.name_format}
	options={[ { val: 'normal' as NameFormat, text: 'Normal' }, { val: 'extended' as NameFormat, text: 'Extended' } ]}
	onchange={(v) => patch('name_format', v as NameFormat)}
/>