<script lang="ts">
	import type { SignatureFieldSpec } from './types';
	let {
		data,
		onupdate
	}: { data: SignatureFieldSpec; onupdate: (data: SignatureFieldSpec) => void } = $props();
</script>

<!-- Signature field has no specific settings currently -->
