<script lang="ts">
	import type { PageProps } from './$types';

	const { data }: PageProps = $props();
</script>
<svelte:head>
	<title>Courses</title>
</svelte:head>
<h1>I am page of course with id = {data.courseId}</h1>