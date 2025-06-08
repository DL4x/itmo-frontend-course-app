<script lang="ts">
    import type { PageProps } from './$types';
    import '/src/app.css';
    import PresentationPreviewCard from '$lib/PresentationPreviewCard.svelte';
    import CourseProgressBar from '$lib/CourseProgressBar.svelte';
    import { favoritePresentationsIDs } from '$lib/frontendEntities';

    const { data }: PageProps = $props();

    const allAuthors = $derived(new Set(data.presentations.flatMap((card) => card.authors)));
</script>

<svelte:head>
    <title>Курсы</title>
</svelte:head>

<main class="max-w-7xl m-auto p-4">
    <div class="about">
        <div class="text-block">
            <h1 class="course-title">Курс: {data.title}</h1>
            <CourseProgressBar courseDocumentId={data.id} />
            <p>{data.description}</p>
            <p>
                {#if allAuthors.size !== 0 && data.presentations.length !== 0}
                    <span class="number">{allAuthors.size}</span> авторов,
                    <span class="number">{data.presentations.length}</span>
                    лекций
                {:else if allAuthors.size !== 0}
                    <span class="number">{allAuthors.size}</span> авторов
                {:else if data.presentations.length !== 0}
                    <span class="number">{data.presentations.length}</span> лекций
                {/if}
            </p>
        </div>
        <img
            src={data.previewUrl}
            alt="course preview"
            style="border-radius: 10px; margin-left: 400px"
        />
    </div>

    <div class="presentations-grid">
        {#each data.presentations as presentation (presentation.id)}
            <PresentationPreviewCard
                {...presentation}
                visited={presentation.visited}
                favorite={$favoritePresentationsIDs === null
                    ? undefined
                    : $favoritePresentationsIDs.has(presentation.id)}
            />
        {/each}
    </div>
</main>

<style>
    .about {
        display: flex;
        flex-direction: row;
        gap: 8px;
        justify-content: space-around;
    }

    .text-block {
        display: flex;
        flex-direction: column;
        gap: 48px;
        justify-content: center;
        font-size: var(--text-xl);
    }

    img {
        width: 500px;
        /*height: 100%;*/
    }

    main {
        display: flex;
        flex-direction: column;
        gap: 32px;
    }

    /*h1 {*/
    /*    color: var(--color-primary-200)*/
    /*}*/

    .presentations-grid {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 16px;
        justify-content: space-around;
    }

    .course-title {
        color: var(--color-primary-200);
    }

    h1 {
        font-size: var(--text-4xl);
        font-weight: bold;
    }

    .number {
        color: var(--color-primary-400);
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
    .course-title {
        color: #ffebe0;
        font-size: 2.5rem;
        font-weight: bold;
        margin-bottom: 1rem;
        text-transform: uppercase;
    }
</style>
