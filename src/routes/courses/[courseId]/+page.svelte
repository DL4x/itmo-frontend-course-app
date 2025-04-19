<script lang="ts">
	import type { PageProps } from './$types';
	import '/src/app.css';
	import PresentationPreviewCard from '$lib/PresentationPreviewCard.svelte';
	import { Heading } from 'flowbite-svelte';

	const { data }: PageProps = $props();
</script>
<svelte:head>
	<title>Courses</title>
</svelte:head>

<main class="flex flex-col gap-12 max-w-7xl m-auto p-4">
	<Heading tag="h1">Наслаждайтесь лекциями от наших великолепных спикеров</Heading>
	<div class="flex flex-row flex-wrap gap-4 justify-around items-stretch">
		{#each data.presentations as presentation (presentation.id)}
			<PresentationPreviewCard {...presentation}/>
		{/each}
	</div>
</main>