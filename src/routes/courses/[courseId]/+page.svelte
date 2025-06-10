<script lang="ts">
    import type {PageProps} from './$types';
    import '/src/app.css';
    import PresentationPreviewCard from '$lib/PresentationPreviewCard.svelte';
    import CourseProgressBar from '$lib/CourseProgressBar.svelte';
    import {favoritePresentationsIDs, type PresentationCardData} from '$lib/frontendEntities';
    import type {Author} from '$lib';
    import {userStore} from '$lib/store';
    import {Search, Toggle} from 'flowbite-svelte';
    import {flip} from 'svelte/animate';
    import {goto, preloadData} from '$app/navigation';

    const {data}: PageProps = $props();

    const authorsCount = $derived(new Set(data.presentations.flatMap(card => card.authors)).size);

    function getProgress(author: Author | null): number | undefined {
        if (author === null) {
            return undefined;
        }
        const progressBar = author.progressBars.find((x) => x.courseDocumentId === data.id);
        if (progressBar === undefined) {
            return 0;
        }
        let count = 0;
        for (const presentationCheck of progressBar.presentationChecks) {
            if (presentationCheck.isVisited) {
                count++;
            }
        }
        return Math.round((count / data.presentations.length) * 100);
    }

    function containsText(presData: PresentationCardData, searchQuery: string): boolean {
        if (searchQuery.length === 0) return true;

        const target = searchQuery.toLowerCase();
        const nameContains = presData.name.toLowerCase().includes(target);
        const descriptionContains = presData.description.toLowerCase().includes(target);
        const authorContains = presData.authors.some(author => author.name.toLowerCase().includes(target))
        return nameContains || descriptionContains || authorContains;
    }

    let searchQuery = $state('');
    let showOnlyUnvisited = $state(false);
    let showOnlyFavorites = $state(false);
    const presentations = $derived.by(() => {
        if (showOnlyFavorites) {
            if ($favoritePresentationsIDs === null) return [];
            if ($favoritePresentationsIDs.size === 0) return [];
            if (showOnlyUnvisited) {
                return data.presentations.filter(
                    it => !it.visited && $favoritePresentationsIDs.has(it.id) && containsText(it, searchQuery)
                );
            }
            return data.presentations.filter(
                it => $favoritePresentationsIDs.has(it.id) && containsText(it, searchQuery)
            );
        }
        if (showOnlyUnvisited) {
            return data.presentations.filter(it => !it.visited && containsText(it, searchQuery));
        }
        return data.presentations.filter(it => containsText(it, searchQuery));
    });
</script>

<svelte:head>
    <title>Курсы</title>
</svelte:head>

<style>
    .text-block {
        display: flex;
        flex-direction: column;
        gap: 32px;
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

        max-width: var(--container-7xl);
        margin: auto;
        padding: 16px;
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
        /*align-items: start;*/
    }

    h1 {
        font-size: var(--text-4xl);
        font-weight: bold;
    }

    .number {
        color: var(--color-primary-400);
    }

    .about {
        display: flex;
        flex-direction: row;
        gap: 8px;
        justify-content: space-between;
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
        color: var(--color-primary-200);
        font-size: 2.5rem;
        font-weight: bold;
        margin-bottom: 1rem;
        text-transform: uppercase;
    }

    img {
        border-radius: 10px;
    }

    .card {
        display: flex;
        padding: 24px;
        border-radius: 24px;
        background: var(--color-my-card-background);
        border: 1px solid var(--color-my-card-border);
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        transition: all 0.2s ease;
        text-decoration: none;

        flex: 1 1 auto;
        width: 350px;
        flex-direction: column;
        align-items: stretch;
        gap: 16px;
        justify-content: space-between;
    }

    .card:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 25px rgba(254, 138, 112, 0.2);
        border-color: rgba(254, 138, 112, 0.3);
    }
    .empty-list-message {
        display: flex;
        flex-direction: column;
        gap: 16px;
        align-items: center;
    }
</style>

<main>
    <div class="about">
        <div class="text-block">
            <h1 class="course-title">Курс: {data.title}</h1>
            <CourseProgressBar progress={getProgress($userStore)}/>
            <p>{data.description}</p>
            <p>
                {#if authorsCount !== 0 && data.presentations.length !== 0}
                    <span class="number">{authorsCount}</span> авторов, <span
                        class="number">{data.presentations.length}</span>
                    лекций
                {:else if authorsCount !== 0}
                    <span class="number">{authorsCount}</span> авторов
                {:else if data.presentations.length !== 0}
                    <span class="number">{data.presentations.length}</span> лекций
                {/if}
            </p>
        </div>
        <img alt="course preview" height="354" src={data.previewUrl} width="500">
    </div>
    <Search bind:value={searchQuery} class="bg-my-card-background border-my-card-border text-primary-100" size="md">
        <Toggle bind:checked={showOnlyFavorites} class="p-4 text-primary-100">Только избранное</Toggle>
        <Toggle bind:checked={showOnlyUnvisited} class="p-4 text-primary-100">Только непрочитанное</Toggle>
    </Search>
    <div class="presentations-grid">
        {#each presentations as presentation (presentation.id)}
            <div animate:flip={{ duration: 200 }} class="card" onclick={() => goto(`/lectures/${presentation.id}`)}
                 onmouseover={() => preloadData(`/lectures/${presentation.id}`)}
                 onfocus={() => preloadData(`/lectures/${presentation.id}`)}>
                <PresentationPreviewCard
                        {...presentation}
                        tags={['Svelte', 'Фронтенд', 'JavaScript', 'Веб-разработка', 'SvelteKit']}
                        favorite={$favoritePresentationsIDs?.has(presentation.id) ?? undefined}
                />
            </div>
        {:else}
            <div class="empty-list-message">
                <p>К сожалению, не найдено ни одной лекции</p>
                <p>Попробуйте изменить критерии поиска и попробовать ещё раз</p>
            </div>
        {/each}
    </div>
</main>
