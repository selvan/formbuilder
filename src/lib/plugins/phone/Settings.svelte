<script lang="ts">
	import type { PhoneFieldData } from './types';
	import type { PhoneFormat } from '$lib/types';
	import SelectSetting from '$lib/components/settings/SelectSetting.svelte';

	let { data, onupdate }: { data: PhoneFieldData; onupdate: (data: PhoneFieldData) => void } = $props();

	function patch<K extends keyof PhoneFieldData>(key: K, value: PhoneFieldData[K]) {
		onupdate({ ...data, [key]: value });
	}
</script>

<SelectSetting
	label="Phone Format"
	value={data.phone_format}
	options={[ { val: 'international' as PhoneFormat, text: 'International' }, { val: 'other' as PhoneFormat, text: '###-###-###' } ]}
	onchange={(v) => patch('phone_format', v as PhoneFormat)}
/>