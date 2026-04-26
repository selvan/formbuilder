<script lang="ts">
	import type { FileFieldData } from './types';
	let { data, onupdate }: { data: FileFieldData; onupdate: (data: FileFieldData) => void } = $props();
</script>
<!-- File field has no specific settings currently -->