<script lang="ts">
	import type { FileFieldSpec } from './types';
	let { data, onupdate }: { data: FileFieldSpec; onupdate: (data: FileFieldSpec) => void } =
		$props();
</script>

<!-- File field has no specific settings currently -->
