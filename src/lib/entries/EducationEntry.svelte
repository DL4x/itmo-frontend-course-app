<script lang="ts">
	import DateRange from '$lib/sections/DateRange.svelte';
	import type { Education } from '$lib';

	const { title, subtitle, timeRange }: Education = $props();
</script>

<div class="content">
	<div class="titles">
		<h2>{title}</h2>
		<h3>{subtitle}</h3>
	</div>
	<DateRange {...timeRange} />
</div>

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
        border: 2px solid black;
        border-radius: 30px;
        padding: 30px;
        width: 65%;
        align-self: center;
        text-align: center;
    }
</style>
