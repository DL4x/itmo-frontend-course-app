<script lang="ts">
    import { userStore } from '$lib/store';
    import type { Author } from '$lib/index';
    import { Progressbar } from 'flowbite-svelte';

    interface Props {
        courseDocumentId: string;
    }

    const { courseDocumentId }: Props = $props();

    function getProgress(author: Author): number {
        const progressBar = author.progressBars.find(
            (x) => x.courseDocumentId === courseDocumentId
        );
        if (progressBar === undefined) {
            return 0;
        }
        let count = 0;
        for (const presentationCheck of progressBar.presentationChecks) {
            if (presentationCheck.isVisited) {
                count++;
            }
        }
        return Math.round((count / progressBar.presentationChecks.length) * 100);
    }
</script>

{#if $userStore === null}
    <p>Войдите в аккаунт чтобы отслеживать ваш прогресс</p>
{:else}
    <Progressbar progress={getProgress($userStore)} labelOutside="Ваш прогресс"></Progressbar>
    <!--	<div class="progress-bar">-->
    <!--		Ваш прогресс:-->
    <!--		-->
    <!--	</div>-->
{/if}

<style>
    p {
        background: var(--color-gray-700);
        border-radius: 8px;
        padding: 8px;
    }
</style>
