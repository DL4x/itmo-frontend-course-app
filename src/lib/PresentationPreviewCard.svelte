<script lang="ts">
    import { Button, Card } from 'flowbite-svelte';
    import { StarSolid, StarOutline } from 'flowbite-svelte-icons';
    import type { Author, IDObject } from '$lib/index';
    import AuthorSmallCard from '$lib/AuthorSmallCard.svelte';
    import { goto } from '$app/navigation';

    interface Props extends IDObject {
        lectureNumber: number;
        name: string;
        description: string;
        previewUrl: string;
        authors: Author[];
        commentsCount: number;
        averageUserScore?: number;
        visited: boolean;
        favorite?: boolean;
    }

    let {
        id,
        lectureNumber,
        name,
        description,
        previewUrl,
        authors,
        averageUserScore,
        commentsCount,
        visited,
        favorite
    }: Props = $props();

    function roundToHumanReadable(x: number): number {
        return Math.round(x * 100) / 100;
    }

    function intToHumanReadableString(x: number): string {
        console.assert(Number.isInteger(x), 'x must be Number.isInteger(x)');
        x = Math.round(x);
        if (x % 1000000 === 0) return `${x / 1000000}M`;
        if (x % 1000 === 0) return `${x / 1000}K`;
        return x.toString();
    }

   /* function onAddToFavorite() {
        console.log(`M-O-C-K-!!! Imagine we toggled FAVORITE button on lecture with name = ${name}`);
    }
*/
    const tags = ["Svelte", "Фронтенд", "JavaScript", "Веб-разработка", "SvelteKit"];

    function getTagColor(tag: string): string {
        const colors: Record<string, string> = {
            'Svelte': 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
            'Фронтенд': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
            'JavaScript': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
            'Веб-разработка': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
            'SvelteKit': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
        };

        if (colors[tag]) return colors[tag];

        const fallbackColors = [
            'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
            'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
            'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200',
            'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200',
            'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200',
            'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200',
            'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200'
        ];
        const hash = tag.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        return fallbackColors[hash % fallbackColors.length];
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

    .title {
        display: flex;
        align-items: self-start;
        justify-content: center;
        gap: 8px;
    }

    .favorites-block {
        display: flex;
        flex-direction: column;
        align-items: end;
    }
</style>

<Card
    size="none"
    img={previewUrl}
    on:click={() => goto(`/lectures/${id}`)}
    class="bg-gray-700 border-gray-700 text-primary-100 hover:bg-gray-600 group grow w-100 max-w-150 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all">

    <div class="min-h-[300px]">
        <div class="title">
            <h5 class="mb-2 text-2xl font-bold tracking-tight">
                Лекция №{lectureNumber.toString()}: {name}
            </h5>
            <div class="favorites-block">
                {#if visited}
                    <p class="read-sign">Прочитано ✓</p>
                {/if}
                <button
                    type="button"
                    on:click|stopPropagation
                    class="p-0 bg-transparent border-none hover:bg-transparent focus:outline-none focus:ring-0"
                >
                    <Button
                        class="p-0 bg-transparent border-none hover:bg-transparent focus:outline-none focus:ring-0"
                        on:click={() => favorite = !favorite}
                    >
                        {#if favorite}
                            <StarSolid class="h-6 w-6 text-yellow-500" />
                        {:else}
                            <StarOutline class="h-6 w-6 text-gray-400" />
                        {/if}
                    </Button>
                </button>
            </div>
        </div>
        <div class="mt-5">
            {#if authors.length !== 0}
                <div class="flex flex-row flex-wrap gap-4">
                    {#each authors as author (author.id)}
                        <AuthorSmallCard {...author} />
                    {/each}
                </div>
            {/if}
        </div>


    </div>
    <div class="border-t border-gray-200 opacity-30 dark:border-gray-700 my-2"></div>
    {#if tags && tags.length > 0}
        <div class="flex flex-wrap gap-2">
            {#each tags as tag}
					<span class={`px-2 py-1 text-xs font-medium rounded ${getTagColor(tag)}`}>
						{tag}
					</span>
            {/each}
        </div>
    {/if}
</Card>