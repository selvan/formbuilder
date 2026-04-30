<script lang="ts">
	import type { AddressFieldData } from './types';
	import SelectSetting from '$lib/plugins/settings/SelectSetting.svelte';
	import { countries } from '$lib/data/countries';

	let { data, onupdate }: { data: AddressFieldData; onupdate: (data: AddressFieldData) => void } = $props();

	function patch<K extends keyof AddressFieldData>(key: K, value: AddressFieldData[K]) {
		onupdate({ ...data, [key]: value });
	}
</script>

<SelectSetting
	label="Default Country"
	value={data.country}
	optgroups={countries}
	onchange={(v) => patch('country', v)}
/>