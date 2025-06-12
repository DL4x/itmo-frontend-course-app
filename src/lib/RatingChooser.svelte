<script lang="ts">
    import {StarOutline, StarSolid} from "flowbite-svelte-icons";

    interface Props {
        rating?: number
        onRating: (rating: number) => void;
        onDeleteRating: () => void;
    }

    const {rating, onRating, onDeleteRating}: Props = $props();
    const STARS_COUNT = 5;
    let currentActiveStar = $state(-1)

    function onHover(i: number) {
        currentActiveStar = i;
    }

    function onClick(i: number) {
        onRating(i + 1);
    }

    function resetStars() {
        currentActiveStar = -1
    }
</script>

<style>
    .rating-block {
        display: flex;
        align-items: center;
        gap: 8px;
    }

    .stars {
        display: flex;
        align-items: center;
        color: burlywood;
    }

    .reset-bar {
        display: flex;
        align-items: center;
        gap: 8px;
        justify-content: space-between;
    }

    .reset-bar button {
        color: var(--color-primary-500);
    }
</style>

<div class="rating-block text-white dark:text-gray-100">
    {#if rating === undefined}
        Поставьте оценку:
        <div class="stars text-white dark:text-gray-100">
            {#each {length: STARS_COUNT} as x, i}
                <div onmouseover={() => onHover(i)} onmouseleave={resetStars} onclick={() => onClick(i)}>
                    {#if i <= currentActiveStar}
                        <StarSolid color="yellow"/>
                    {:else}
                        <StarOutline/>
                    {/if}
                </div>
            {/each}
        </div>
    {:else}
        <p class="reset-bar">Оценка поставлена.
            <button onclick={onDeleteRating}>Поменять?</button>
        </p>
    {/if}
</div>
