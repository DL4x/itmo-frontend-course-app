<script lang="ts">
    import {Button, Progressbar} from 'flowbite-svelte';
    import {UndoOutline} from "flowbite-svelte-icons";

    interface Props {
        progress?: number;
        onResetClick: () => void;
    }

    const {progress, onResetClick}: Props = $props();

    function onClick(event: MouseEvent) {
        event.stopPropagation();
        onResetClick();
    }
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

    .progress-bar-value {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        gap: 8px;
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
            <span class="progress-bar-value">
                {#if progress !== undefined && progress !== 0}
                    <UndoOutline class="text-primary-500" onclick={onClick}/>
                {/if}
                {progress}%
            </span>
        </div>
        <Progressbar classLabelOutside="text-primary-100" progress={progress}/>
    </div>
{/if}