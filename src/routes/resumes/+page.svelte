<script lang="ts">
	import type { PageProps } from './$types';
	import '/src/app.css';
	import { Card, Heading, P } from 'flowbite-svelte';

	const { data }: PageProps = $props();
</script>

<svelte:head>
	<title>Lecturer resumes</title>
</svelte:head>

<main>
	<header class="flex flex-col items-center gap-4">
		<Heading tag="h1">Welcome to ITMO Frontend Course</Heading>
		<P class="text-lg text-gray-700 dark:text-gray-300">This site is a Work-in-Progress. You can view participants' resumes below.</P>
	</header>

	<section class="flex flex-row flex-wrap gap-4 justify-center">
		{#each data.authors as author (author.id)}
			<Card href="/resumes/{author.id}" class="w-xs flex flex-col gap-4 items-center shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all">
				<div class="avatar">
					<span>{author.name[0]}</span>
				</div>
				<P>{author.name}</P>
			</Card>
		{/each}
	</section>
</main>

<style>
    main {
        font-family: 'JetBrains Mono', monospace;
        max-width: 1200px;
        margin: 0 auto;
        padding: 2rem;
    }

    header {
        text-align: center;
        margin-bottom: 3rem;
        font-family: 'JetBrains Mono', monospace;
    }

    .avatar {
        width: 64px;
        height: 64px;
        background-color: #ddd;
        color: #333;
        font-weight: bold;
        font-size: 1.4rem;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.05);
    }
</style>
