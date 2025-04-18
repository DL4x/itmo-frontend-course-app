<script lang="ts">
	import type { PresentationCardData } from '$lib/frontendEntities';
	import { Card } from 'flowbite-svelte';

	const { id, presentationName, presentationDescription, presentationUrl, authors, averageUserScore, commentsCount}: PresentationCardData = $props()
</script>

<Card img={presentationUrl} href="/lectures/{id}">
	<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{presentationName}</h5>
	<p class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight">{presentationDescription}</p>
	<div>
<!--		TODO list of authors-->
	</div>
</Card>