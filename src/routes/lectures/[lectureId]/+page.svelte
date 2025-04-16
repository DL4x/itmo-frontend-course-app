<script lang="ts">
	import type { PageProps } from './$types';
	import '/src/app.css';
	import { Heading } from 'flowbite-svelte';

	const { data }: PageProps = $props();
</script>

<svelte:head>
	<title>Lectures</title>
</svelte:head>

<Heading tag="h1">I am page of lecture with id = {data.lectureId}</Heading>

<Heading tag="h1">Course id = {data.lectureId}</Heading>