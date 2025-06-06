<script lang="ts">
	import type { PageProps } from './$types';
	import '/src/app.css';
	import PresentationPreviewCard from '$lib/PresentationPreviewCard.svelte';

	const { data }: PageProps = $props();
	const allAuthors = $derived(new Set(data.presentations.flatMap(card => card.authors)));
</script>

<svelte:head>
	<title>Курсы</title>
</svelte:head>

<style>
    .about {
        display: flex;
        flex-direction: row;
        gap: 8px;
    }

    .text-block {
        display: flex;
        flex-direction: column;
        gap: 32px;
				justify-content: center;
    }

    img {
        width: 500px;
        /*height: 100%;*/
    }

    @media (width < 48rem) {
        .about {
            flex-direction: column;
        }

        img {
            width: 100%;
            order: -1;
        }
    }
	.course-heading {
		color: #FFEBE0;
		font-size: 2.5rem;
		font-weight: bold;
		margin-bottom: 1rem;
		text-transform: uppercase;
	}
	.course-description {
		color: #FFEBE0;
		font-size: 2rem;
		margin-bottom: 1rem;

	}
</style>

<main class="flex flex-col gap-12 max-w-7xl m-auto p-4">
	<div class="about">
		<div class="text-block">
			<h1 class="course-heading">Курс: Название курса</h1>
			<h2 class="course-description">{data.description}</h2>
			<p>
				{#if allAuthors.size !== 0 && data.presentations.length !== 0}
					{allAuthors.size} авторов, {data.presentations.length} лекций
				{:else if allAuthors.size !== 0}
					{allAuthors.size} авторов
				{:else if data.presentations.length !== 0}
					{data.presentations.length} лекций
				{/if}
			</p>
		</div>
	</div>


	<div class="flex flex-row flex-wrap gap-4 justify-around">
		{#each data.presentations as presentation (presentation.id)}
			<PresentationPreviewCard {...presentation} />
		{/each}
	</div>
</main>