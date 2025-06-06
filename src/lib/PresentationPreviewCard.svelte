<script lang="ts">
	import { Button, Card, Rating } from 'flowbite-svelte';
	import { ThumbsUpSolid, ThumbsUpOutline } from 'flowbite-svelte-icons';
	import type { Author, IDObject } from '$lib/index';
	import AuthorSmallCard from '$lib/AuthorSmallCard.svelte';

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

	const {
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

	function onAddToFavorite() {
		console.log(`M-O-C-K-!!! Imagine we toggled FAVORITE button on lecture with name = ${name}`);
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

<Card size="none" img={previewUrl.length === 0 ? undefined : previewUrl}
			class="bg-gray-700 border-gray-700 text-primary-100 hover:bg-gray-600 group grow w-100 max-w-150 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all">
	<div class="flex flex-col gap-4">
		<div class="title">
			<h5 class="mb-2 text-2xl font-bold tracking-tight">
				Лекция №{lectureNumber.toString()}: {name}
			</h5>
			<div class="favorites-block">
				{#if visited}
					<p class="read-sign">Прочитано ✓</p>
				{/if}
				<Button class="p-2!" size="xl" on:click={onAddToFavorite}>
					{#if favorite}
						<ThumbsUpSolid class="h-6 w-6" />
					{:else}
						<ThumbsUpOutline class="h-6 w-6" />
					{/if}
				</Button>
				<!--				<Rating on:click={onAddToFavorite} size={32} total={1} rating={favorite ? 1.0 : 0.0} />-->
			</div>
		</div>
		<p class="font-normal leading-tight">
			{description}
		</p>
		{#if commentsCount !== 0 || averageUserScore !== undefined}
			<div class="flex flex-row gap-4 justify-between items-center">
				{#if commentsCount !== 0}
					<span class="text-nowrap">{intToHumanReadableString(commentsCount)} комментариев</span>
				{/if}
				{#if averageUserScore !== undefined}
					<Rating total={averageUserScore > 5 ? averageUserScore : 5} size={20} rating={averageUserScore}>
						<p slot="text" class="ms-2 text-sm font-medium">
							{roundToHumanReadable(averageUserScore).toString()}
						</p>
					</Rating>
				{/if}
			</div>
		{/if}
		{#if authors.length !== 0}
			<div class="flex flex-row flex-wrap gap-4">
				{#each authors as author (author.id)}
					<AuthorSmallCard {...author} />
				{/each}
			</div>
			<Button href="/lectures/{id}">Узнать больше...</Button>
		{/if}
	</div>
</Card>