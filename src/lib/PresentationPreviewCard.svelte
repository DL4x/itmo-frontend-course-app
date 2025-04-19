<script lang="ts">
	import type { PresentationCardData } from '$lib/frontendEntities';
	import { Card, Rating } from 'flowbite-svelte';
	import AuthorSmallCard from '$lib/AuthorSmallCard.svelte';

	const {
		lectureNumber,
		id,
		name,
		description,
		presentationUrlId,
		authors,
		averageUserScore,
		commentsCount
	}: PresentationCardData = $props();

	const roundToHumanReadable = (x: number): number => Math.round(x * 100) / 100;

	function intToHumanReadableString(x: number): string {
		console.assert(Number.isInteger(x), "x must be Number.isInteger(x)")
		x = Math.round(x)
		if (x % 1000000 === 0) return `${x / 1000000}M`;
		if (x % 1000 === 0) return `${x / 1000}K`;
		return x.toString();
	}
</script>

<Card size="none" img={presentationUrlId.length === 0 ? undefined : presentationUrlId} href="/lectures/{id}"
			class="group grow w-100 max-w-150 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all">
	<div class="flex flex-col gap-4">
		<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
			Лекция №{lectureNumber.toString()}: {name}
		</h5>
		<p class="font-normal text-gray-700 dark:text-gray-400 leading-tight">
			{description}
		</p>
		{#if commentsCount !== 0 && averageUserScore !== undefined}
			<div class="flex flex-row gap-4 justify-between items-center">
				{#if commentsCount !== 0}
					<span class="text-nowrap">{intToHumanReadableString(commentsCount)} комментариев</span>
				{/if}
				{#if averageUserScore !== undefined}
					<Rating total={averageUserScore > 5 ? averageUserScore : 5} size={20} rating={averageUserScore}>
						<p slot="text" class="ms-2 text-sm font-medium text-gray-500 dark:text-gray-400">
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
		{/if}
	</div>
</Card>