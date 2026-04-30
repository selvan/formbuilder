<script lang="ts">
	import type { PhoneFieldSpec } from './types';
	import type { PhoneFormat } from '$lib/core';
	import SelectSetting from '$lib/plugins/settings/SelectSetting.svelte';

	let { data, onupdate }: { data: PhoneFieldSpec; onupdate: (data: PhoneFieldSpec) => void } =
		$props();

	function patch<K extends keyof PhoneFieldSpec>(key: K, value: PhoneFieldSpec[K]) {
		onupdate({ ...data, [key]: value });
	}
</script>

<SelectSetting
	label="Phone Format"
	value={data.phone_format}
	options={[
		{ val: 'international' as PhoneFormat, text: 'International' },
		{ val: 'other' as PhoneFormat, text: '###-###-###' }
	]}
	onchange={(v) => patch('phone_format', v as PhoneFormat)}
/>
