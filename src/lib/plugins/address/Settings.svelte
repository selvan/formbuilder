<script lang="ts">
	import type { AddressFieldSpec } from './types';
	import SelectSetting from '$lib/plugins/settings/SelectSetting.svelte';
	import { countries } from '$lib/data/countries';

	let { data, onupdate }: { data: AddressFieldSpec; onupdate: (data: AddressFieldSpec) => void } =
		$props();

	function patch<K extends keyof AddressFieldSpec>(key: K, value: AddressFieldSpec[K]) {
		onupdate({ ...data, [key]: value });
	}
</script>

<SelectSetting
	label="Default Country"
	value={data.country}
	optgroups={countries}
	onchange={(v) => patch('country', v)}
/>
