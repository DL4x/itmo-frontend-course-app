<script lang="ts">
    import {Button, Progressbar} from 'flowbite-svelte';

    interface Props {
        progress?: number;
    }

    const {progress}: Props = $props();
</script>

<style>
    p {
        background: var(--color-gray-700);
        border-radius: 8px;
        padding: 8px;
    }

    .progress {
        display: flex;
        flex-direction: column;
        gap: 8px;
        align-items: stretch;
    }

    .text-label {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
</style>

{#if progress === undefined }
    <Button href="/auth" class="font-bold tracking-widest uppercase bg-primary-700">
        Войдите в аккаунт чтобы отслеживать ваш прогресс
    </Button>
{:else}
    <div class="progress">
        <div class="text-label">
            <span class="progress-bar-text">Ваш прогресс:</span>
            <span class="progress-bar-value">{progress}%</span>
        </div>
        <Progressbar classLabelOutside="text-primary-100" progress={progress}/>
    </div>
    <!--	<div class="progress-bar">-->
    <!--		Ваш прогресс:-->
    <!--		-->
    <!--	</div>-->
{/if}