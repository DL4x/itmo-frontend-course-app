<script lang="ts">
    import {StarOutline, StarSolid} from 'flowbite-svelte-icons';
    import AuthorSmallCard from '$lib/AuthorSmallCard.svelte';
    import type {PresentationCardData} from '$lib/frontendEntities';
    import TagsList from "$lib/TagsList.svelte";

    interface Props extends PresentationCardData {
        favorite?: boolean;
        onTagClick: (tag: string) => void;
        onFavoriteClick: () => void;
    }

    let {
        name,
        authors,
        visited,
        favorite,
        tags,
        onTagClick,
        onFavoriteClick
    }: Props = $props();

    function onAddToFavorite(event: Event) {
        event.stopPropagation();
        onFavoriteClick();
    }
</script>

<style>
    .read-sign {
        /*background: var(--color-gray-);*/
        padding: 4px;
        border-radius: 8px;
        color: var(--color-primary-700);
        white-space: nowrap;
    }

    /*.title {
        display: flex;
        align-items: start;
        justify-content: space-between;
        gap: 8px;
    }*/

    .favorites-block {
        float: right;
        display: flex;
        flex-direction: column;
        align-items: end;
    }

    .details {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: stretch;
        gap: 16px;
    }
</style>

<div class="title">
    <div class="favorites-block">
        {#if visited}
            <p class="read-sign">Прочитано ✓</p>
        {/if}
        {#if favorite !== undefined}
            {#if favorite}
                <StarSolid size="lg" class="favorite-button text-yellow-500" onclick={onAddToFavorite}/>
            {:else}
                <StarOutline size="lg" class="favorite-button text-gray-400" onclick={onAddToFavorite}/>
            {/if}
        {/if}
    </div>
    <h5 class="mb-2 text-2xl font-bold tracking-tight">{name}</h5>
</div>
{#if authors.length !== 0 || tags.size !== 0}
    <div class="details">
        {#if authors.length !== 0}
            <div class="flex flex-row flex-wrap gap-2">
                {#each authors as author (author.id)}
                    <AuthorSmallCard {...author}/>
                {/each}
            </div>
        {/if}
        {#if tags.size !== 0}
            <TagsList tags={tags} onTagClick={tag => onTagClick(tag)}/>
        {/if}
    </div>
{/if}
