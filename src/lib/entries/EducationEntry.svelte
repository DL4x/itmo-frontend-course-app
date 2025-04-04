<script lang="ts">
	import type { Education } from '$lib';
	import DateRange from '$lib/DateRange.svelte';

	const { title, subtitle, timeRange }: Education = $props();
</script>

<style>
    .content > .titles {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }

    .content {
        display: flex;
        flex-direction: column;
        gap: 16px;
    }
</style>

<div class="content">
	<div class="titles">
		<h2>{title}</h2>
		<h3>{subtitle}</h3>
	</div>
	<DateRange {...timeRange}/>
</div>