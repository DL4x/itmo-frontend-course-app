<script lang="ts">
	import type { PageProps } from './$types';
	
	const { data }: PageProps = $props();
</script>

<svelte:head>
	<title>ITMO Frontend Course</title>
</svelte:head>

<h1>Welcome to ITMO Frontend course</h1>
<p>Cite is Work-in-Progress now, so you can only view our resume's</p>
<nav>
	<ul>
		{#each data.authors as author (author.id)}
			<li><a href="/resumes/{author.id}">{author.name} has id = {author.id}</a></li>
		{/each}
	</ul>
</nav>