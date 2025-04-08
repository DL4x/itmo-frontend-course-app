<script lang="ts">
	import type { PageProps } from './$types';

	const { data }: PageProps = $props();
</script>

<svelte:head>
	<title>Lectures</title>
</svelte:head>

<h1>I am page of lecture with id = {data.lectureId}</h1>

<h1>Course id = {data.courseId}</h1>