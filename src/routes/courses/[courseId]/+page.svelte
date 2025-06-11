<script lang="ts">
    import type {PageProps} from './$types';
    import '/src/app.css';
    import PresentationPreviewCard from '$lib/PresentationPreviewCard.svelte';
    import CourseProgressBar from '$lib/CourseProgressBar.svelte';
    import {favoritePresentationsIDs, type PresentationCardData} from '$lib/frontendEntities';
    import type {Author} from '$lib';
    import {notifyUserDataChanged, userStore} from '$lib/store';
    import {Search, Toggle} from 'flowbite-svelte';
    import {flip} from 'svelte/animate';
    import {goto, preloadData} from '$app/navigation';
    import TagsList from "$lib/TagsList.svelte";
    import {SvelteSet} from "svelte/reactivity";
    import {addFavouritePresentation, deleteFavouritePresentation} from "$lib/strapiRepository";

    const {data}: PageProps = $props();

    const authorsCount = $derived(new Set(
        data.presentations
            .flatMap(card => card.authors)
            .map(author => author.name)
    ).size);

    /**
     * There is a function in STD library that can replace this function, but it's still too new and experimental, so I implement this from scratch
     */
    function unionOfSets<T>(...sets: Set<T>[]): Set<T> {
        const result = new Set<T>();
        for (const set of sets) for (const x of set.keys()) result.add(x);
        return result;
    }

    function getProgress(author: Author | null): number | undefined {
        if (author === null) {
            return undefined;
        }
        const progressBar = author.progressBars.find(x => x.courseDocumentId === data.id);
        return progressBar === undefined ? 0 : Math.round(
            (progressBar.presentations.length / data.presentations.length) * 100
        );
    }

    const requiredTags = new SvelteSet<string>();
    let searchQuery = $state('');
    let showOnlyUnvisited = $state(false);
    let showOnlyFavorites = $state(false);

    const allTags = $derived(unionOfSets(...data.presentations.map(cardData => cardData.tags)));
    const presentations = $derived.by(() => {
        function textFilter(presData: PresentationCardData): boolean {
            if (searchQuery.length === 0) return true;

            const target = searchQuery.toLowerCase();

            const nameContains = presData.title.toLowerCase().includes(target);
            const descriptionContains = presData.description.toLowerCase().includes(target);
            const authorContains = presData.authors.some(author => author.name.toLowerCase().includes(target))
            return nameContains || descriptionContains || authorContains;
        }

        function tagsFilter(cardData: PresentationCardData): boolean {
            if (requiredTags.size === 0) {
                return true;
            }

            return requiredTags.keys().every(tag => cardData.tags.has(tag));
        }

        const restFilters = (it: PresentationCardData): boolean => tagsFilter(it) && textFilter(it);

        if (showOnlyFavorites) {
            if ($favoritePresentationsIDs === null) return [];
            if ($favoritePresentationsIDs.size === 0) return [];
            if (showOnlyUnvisited) {
                return data.presentations.filter(
                    it => !it.visited && $favoritePresentationsIDs.has(it.id) && restFilters(it)
                );
            }
            return data.presentations.filter(
                it => $favoritePresentationsIDs.has(it.id) && restFilters(it)
            );
        }
        if (showOnlyUnvisited) {
            return data.presentations.filter(it => !it.visited && restFilters(it));
        }
        return data.presentations.filter(restFilters);
    });

    function onTagClick(tag: string) {
        if (requiredTags.has(tag)) {
            console.log(`deleting tag ${tag}`);
            requiredTags.delete(tag);
        } else {
            console.log(`adding tag ${tag}`);
            requiredTags.add(tag);
        }
    }

    async function onFavoriteClicked(author: Author | null, presentationDocumentId: string) {
        if ($favoritePresentationsIDs === null || author === null) {
            console.error(`Favorite clicked but user is not logged`);
            return;
        }
        if ($favoritePresentationsIDs.has(presentationDocumentId)) {
            console.log("Deleting presentation from favorites");
            await deleteFavouritePresentation(author, presentationDocumentId);
        } else {
            console.log("Adding presentation to favorites");
            await addFavouritePresentation(author, presentationDocumentId);
        }
        await notifyUserDataChanged(author);
    }
</script>

<svelte:head>
    <title>Курсы</title>
</svelte:head>

<style>
    .text-block {
        display: flex;
        flex-direction: column;
        gap: 16px;
        justify-content: space-between;
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

    .presentations-grid {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 16px;
        justify-content: space-around;
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

    .search-bar {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        gap: 16px;
    }

    .filters {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: stretch;
        gap: 16px;
    }

    .toggles {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 8px;
        align-items: stretch;
    }
    @media (width < 48rem) {
        .about {
            flex-direction: column;
        }

        img {
            display: none;
            width: 100%;
            order: -1;
        }
        .toggles {
            order: -1;
        }
        .filters {
            flex-direction: column;
        }
    }
</style>

<main>
    <div class="about">
        <div class="text-block">
            <h1 class="course-title">{data.title}</h1>
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
    <div class="search-bar">
        <Search bind:value={searchQuery} class="bg-my-card-background border-my-card-border text-primary-100"
                size="lg"/>
        <div class="filters">
            <TagsList tags={allTags} activeTags={requiredTags} onTagClick={onTagClick}/>
            <div class="toggles">
                <Toggle bind:checked={showOnlyFavorites} class="dark text-primary-100 text-sm">Избранное</Toggle>
                <Toggle bind:checked={showOnlyUnvisited} class="dark text-primary-100 text-sm">Непрочитанное</Toggle>
            </div>
        </div>
    </div>
    <div class="presentations-grid">
        {#each presentations as presentation (presentation.id)}
            <div animate:flip={{ duration: 200 }} class="card" onclick={() => goto(`/lectures/${presentation.id}`)}
                 onmouseover={() => preloadData(`/lectures/${presentation.id}`)}
                 onfocus={() => preloadData(`/lectures/${presentation.id}`)}>
                <PresentationPreviewCard
                        {...presentation}
                        favorite={$favoritePresentationsIDs?.has(presentation.id) ?? undefined}
                        onTagClick={tag => onTagClick(tag)}
                        onFavoriteClick={() => onFavoriteClicked($userStore, presentation.id)}
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
