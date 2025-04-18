<script lang="ts">
    import type { PageProps } from './$types';
    import { Heading, Rating, Card, Button, Textarea, P } from 'flowbite-svelte';

    const { data }: PageProps = $props();

    function averageRating() {
        const length = data.presentation.votedPersons.length;
        if (length === 0) return 0;
        return data.presentation.votedPersons
            .map(person => person.personScore)
            .reduce((sum, value) => sum + value, 0) / length;
    }
</script>

<svelte:head>
    <title>{data.presentation.presentationName} | Lectures</title>
</svelte:head>

<div class="w-[80%] mx-auto px-4 py-8">
    <div class="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
        <div class="flex-1">
            <Heading tag="h1" class="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
                {data.presentation.presentationName}
            </Heading>
            <p class="text-lg text-gray-600 dark:text-gray-300">
                {data.presentation.presentationDescription}
            </p>
        </div>
        <div class="w-full md:w-auto md:text-right">
            <p class="text-sm text-gray-500 dark:text-gray-400">Average rating</p>
            <Rating id="lecture-rating" total={5} rating={averageRating()} class="justify-start md:justify-end" />
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Based on {data.presentation.votedPersons.length} votes
            </p>
        </div>
    </div>

    <div class="w-full mb-8">
        <div class="w-full aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
            <iframe
                title="Lecture presentation"
                class="w-full h-full"
                src='https://docs.google.com/presentation/d/{data.presentation.presentationUrl}/embed?start=false&loop=false'
                allowfullscreen
            >
            </iframe>
        </div>
    </div>

    <div class="w-full mb-8">
        <Card class="w-full max-w-none">
            <Heading tag="h3" class="mb-4 text-xl sm:text-2xl text-gray-900 dark:text-white">Leave a comment</Heading>
            <form class="w-full">
                <Textarea
                    placeholder="Share your thoughts about this lecture..."
                    rows={2}
                    class="w-full mb-4 text-xs sm:text-sm"
                />
                <Button type="submit" class="w-full sm:w-auto">
                    Post comment
                </Button>
            </form>
        </Card>
    </div>

    <div class="w-full">
        <Heading tag="h3" class="mb-4 text-xl sm:text-2xl text-gray-900 dark:text-white">Comments</Heading>
        <div class="space-y-4 w-full">
            {#if data.presentation.comments.length === 0}
                <Heading tag="h4" class="text-base sm:text-lg text-gray-600 dark:text-gray-300">No comments...</Heading>
            {:else}
                {#each data.presentation.comments as comment (comment.id)}
                    <Card class="w-full max-w-none">
                        <Heading tag="h4" class="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200">{comment.author.name}</Heading>
                        <P class="text-s sm:text-sm text-gray-600 dark:text-gray-300">{comment.commentDescription}</P>
                    </Card>
                {/each}
            {/if}
        </div>
    </div>
</div>
