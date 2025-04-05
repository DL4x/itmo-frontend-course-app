<script lang="ts">
	import type { TimeRange } from '$lib/index';

	const { start, end }: TimeRange = $props();
</script>

<div>
	<time datetime={start.toString()}>{start}</time>
	{#if end !== start}
		-
		<time datetime={end.toString()}>{end}</time>
	{/if}
</div>

<style>
    * {
        line-height: 1.5rem;
        color: #363e45;
    }
</style>
