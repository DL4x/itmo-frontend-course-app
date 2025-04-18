<script lang="ts">
	import type { PageProps } from './$types';
	import '/src/app.css';
	import { Heading } from 'flowbite-svelte';

	const { data }: PageProps = $props();
</script>
<svelte:head>
	<title>Courses</title>
</svelte:head>
<Heading tag="h1">I am page of course with {data.presentations.length} presentations</Heading>
<!--<div class="flex flex-row flex-wrap gap-4 justify-center">-->
<!--	{#each data.presentations as presentation (presentation.id)}-->
<!--		<PresentationPreviewCard {presentation}/>-->
<!--	{/each}-->
<!--</div>-->