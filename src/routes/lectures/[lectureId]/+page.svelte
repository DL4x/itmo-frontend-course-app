<script lang="ts">
    import type { PageProps } from './$types';
    import { Heading, Rating, Card, Button, Textarea, P } from 'flowbite-svelte';
    import { addComment } from '$lib/strapiRepository';
    import { userStore } from '../../../store';
    import type { AuthorComment } from '$lib';

    const { data }: PageProps = $props();

    let commentText: string = '';
    let comments: AuthorComment[] = data.presentation.comments;

    function averageRating() {
        const length = data.presentation.votedPersons.length;
        if (length === 0) return 0;
        return data.presentation.votedPersons
            .map(person => person.personScore)
            .reduce((sum, value) => sum + value, 0) / length;
    }

    async function handleComment() {
        if (!$userStore?.name) {
            return;
        }

        await addComment(
            commentText,
            $userStore.id,
            data.presentation.documentId
        );
        commentText = '';

        window.location.reload();
    }
</script>

<svelte:head>
    <title>{data.presentation.presentationName} | Lectures</title>
</svelte:head>

<div class="w-[80%] mx-auto px-4 py-8">
    <div class="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
        <div class="flex-1">
            <h1 class="lecture-name">
                {data.presentation.presentationName}
            </h1>
            <p class="text-lg text-[#fcefe8] dark:text-gray-300">
                {data.presentation.presentationDescription}
            </p>
        </div>
        <div class="w-full md:w-auto md:text-right">
            <p class="text-sm text-[#fcefe8] dark:text-gray-400">Average rating</p>
            <Rating id="lecture-rating" total={5} rating={averageRating()} class="justify-start md:justify-end" />
            <p class="text-xs text-[#fcefe8] dark:text-gray-400 mt-1">
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

        <div class="mt-4">
            <a
                href={`https://docs.google.com/presentation/d/${data.presentation.presentationUrl}/export/pdf`}
                download="presentation.pdf"
                class="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                </svg>
                Скачать PDF
            </a>

            <a
                href={`https://docs.google.com/presentation/d/${data.presentation.presentationUrl}/export/pptx`}
                download="presentation.pptx"
                class="inline-flex items-center px-4 py-2 ml-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
            >
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                </svg>
                Скачать PPTX
            </a>
        </div>
    </div>

    <div class="w-full mb-8">
        <Card class="w-full max-w-none bg-[#c7c1bc] dark:bg-gray-800">
            <Heading tag="h3" class="mb-4 text-xl sm:text-2xl text-[#615151] dark:text-white">
                Написать комментарий
            </Heading>
            <form class="w-full">
            <Textarea
                bind:value={commentText}
                placeholder="Расскажите, как вам лекция"
                rows={2}
                class="w-full mb-4 text-xs sm:text-sm"
            />
                <Button class="w-full sm:w-auto bg-[#FE8A70]" on:click={handleComment}>
                    Опубликовать
                </Button>
            </form>
        </Card>
    </div>

    <div class="w-full">
        <Heading tag="h3" class="mb-4 text-xl sm:text-2xl text-[#fcefe8] dark:text-white">Комментарии</Heading>
        <div class="space-y-4 w-full">
            {#if comments.length === 0}
                <Heading tag="h4" class="text-base sm:text-lg text-gray-600 dark:text-gray-300">Комментариев пока нет...</Heading>
            {:else}
                {#each comments as comment (comment.id)}
                    <Card class="w-full max-w-none bg-[#c7c1bc] flex items-start gap-3">
                        <div class="flex flex-col md:flex-row justify-between">
                            <div class="flex items-center justify-center w-15 h-11 rounded-full bg-[#615151] text-white font-semibold text-xl">
                                {comment.author.name.charAt(0).toUpperCase()}
                            </div>
                            <Heading
                                tag="h2"
                                class="text-base sm:text-lg font-semibold text-[#615151] dark:text-gray-200 ml-4 md:ml-6 mt-2"
                            >
                                {comment.author.name}
                            </Heading>
                        </div>
                        <div class="ml-16 md:ml-17">
                            <P class="text-base sm:text-lg text-[#615151] dark:text-gray-300">
                                {comment.commentDescription}
                            </P>
                        </div>
                    </Card>
                {/each}
            {/if}
        </div>
    </div>
</div>


<style>
    .lecture-name {
        color: #FFEBE0;
        font-size: 2.2rem;
        font-weight: bold;
        margin-bottom: 1rem;
        text-transform: uppercase;
    }
</style>