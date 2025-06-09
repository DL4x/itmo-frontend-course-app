<script lang="ts">
    import NewProfile from '$lib/mySections/NewProfile.svelte';
    import NewSkills from '$lib/mySections/NewSkills.svelte';
    import NewEducation from '$lib/mySections/NewEducation.svelte';
    import NewExperience from '$lib/mySections/NewExperience.svelte';
    import NewLections from '$lib/mySections/NewLections.svelte';
    import {self} from 'svelte/legacy';

    let activeBlock: boolean = $state(false);
    let fullContent: string = $state('');
    let currentTitle: string = $state('');


    function openModal() {
        activeBlock = true;
    }

    function closeModal() {
        activeBlock = false;
    }

    // Пример контента для блоков
    const blocks = [
        {
            title: 'Блок 1.1',
            shortContent: 'Краткое описание блока 1.1...',
            fullContent:
                'Полное содержимое блока 1.1. Может быть очень длинным текстом с множеством деталей и дополнительной информацией, которая не умещается в стандартном блоке.'
        },
        {
            title: 'Блок 1.2',
            shortContent: 'Краткое описание блока 1.2...',
            fullContent:
                'Полное содержимое блока 1.2. Может быть очень длинным текстом с множеством деталей и дополнительной информацией, которая не умещается в стандартном блоке.'
        },
        {
            title: 'Блок 2.1',
            shortContent: 'Краткое описание блока 2.1...',
            fullContent:
                'Полное содержимое блока 2.1. Может быть очень длинным текстом с множеством деталей и дополнительной информацией, которая не умещается в стандартном блоке.'
        },
        {
            title: 'Блок 2.2',
            shortContent: 'Краткое описание блока 2.2...',
            fullContent:
                'Полное содержимое блока 2.2. Может быть очень длинным текстом с множеством деталей и дополнительной информацией, которая не умещается в стандартном блоке.'
        },
        {
            title: 'Блок 3.1',
            shortContent: 'Краткое описание блока 3.1...',
            fullContent:
                'Полное содержимое блока 3.1. Может быть очень длинным текстом с множеством деталей и дополнительной информацией, которая не умещается в стандартном блоке.'
        },
        {
            title: 'Блок 3.2',
            shortContent: 'Краткое описание блока 3.2...',
            fullContent:
                'Полное содержимое блока 3.2. Может быть очень длинным текстом с множеством деталей и дополнительной информацией, которая не умещается в стандартном блоке.'
        },
        {
            title: 'Блок 3.3',
            shortContent:
                'Краткое описание блока 3.3... Краткое описание блока 3.3... Краткое описание блока 3.3... Краткое описание блока 3.3... Краткое описание блока 3.3... Краткое описание блока 3.3... Краткое описание блока 3.3...',
            fullContent:
                'Полное содержимое блока 3.3. Может быть очень длинным текстом с множеством деталей и дополнительной информацией, которая не умещается в стандартном блоке.'
        }
        // ... остальные блоки
    ];

</script>

<div class="page" class:dimmed={activeBlock}>
    <!-- Колонка 1 -->
    <div class="column column-1">
        <div class="block profile-block">
            <NewProfile/>
        </div>
        <div class="block">
            <NewSkills/>
        </div>
    </div>

    <!-- Колонка 2 -->
    <div class="column column-2">
        <div class="block">
            <NewEducation/>
        </div>
        <div class="block">
            <NewExperience/>
        </div>
        <div class="block">
            <NewLections/>
        </div>
    </div>
</div>


{#if activeBlock}
    <div class="modal-backdrop" onclick={self(closeModal)}>
        <div class="modal">
            <h2>{currentTitle}</h2>
            <div class="modal-content">
                {fullContent}
            </div>
            <div class="modal-button-container">
                <button class="close-btn" onclick={closeModal}> Close</button>
            </div>
        </div>
    </div>
{/if}


<style>
    .page {
        display: grid;
        grid-template-columns: 40% 55%;
        gap: 20px;
        width: 100%;
        min-width: 0;
        margin: 0;
        padding: 0;
    }

    .column {
        display: grid;
        gap: 20px;
        min-width: 0;
        height: 800px;
        margin-top: 10px;
    }

    .column-1 {
        grid-template-rows: 70% 30%;
    }

    .column-2 {
        grid-template-rows: 30% 35% 40%;
    }

    .block-content {
        flex: 1;
        /* overflow: auto; */
        overflow: hidden;
        padding-bottom: 30px;
        display: -webkit-box;
        /* -webkit-line-clamp: 3; Количество строк до обрезания */
        -webkit-box-orient: vertical;
        text-overflow: ellipsis;
        margin-bottom: 10px;
        line-height: 1.4;
    }


    /* -------------------------------- */

    .block {
        position: relative;
        background: #f0f0f0;
        border: 5px solid #ccc;
        padding: 10px;
        box-sizing: border-box;
        min-width: 0;
        display: flex;
        flex-direction: column;

        border-radius: 25px;

        /* height: 100%; */
    }

    .profile-block {
        justify-content: center;
    }

    .button-container {
        position: relative;
        height: 30px;
    }

    .read-more-btn {
        position: absolute;
        right: 0;
        bottom: 0;
        padding: 5px 10px;
        background: #4caf50;
        color: white;
        border: none;
        border-radius: 3px;
        cursor: pointer;
        font-size: 12px;
    }

    .read-more-btn:hover {
        background: #45a049;
    }

    .modal-backdrop {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    }

    .modal {
        background: white;
        padding: 20px;
        border-radius: 8px;
        width: 60%;
        max-width: 500px;
        position: relative;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
        display: flex;
        flex-direction: column;
        min-height: 300px;
        max-height: 600px;
    }

    .modal-content {
        overflow: auto;
        flex: 1;
        white-space: pre-line; /* Сохраняет переносы строк */
        overflow-wrap: break-word;
    }

    .modal-button-container {
        display: flex;
        justify-content: flex-end;
    }

    .close-btn {
        padding: 8px 16px;
        background: #f44336;
        color: white;
        border: none;
        border-radius: 3px;
        cursor: pointer;
        font-size: 14px;
    }

    .close-btn:hover {
        background: #d32f2f;
    }

    .page.dimmed {
        filter: brightness(0.7);
        pointer-events: none;
        user-select: none;
    }

    /* ------------------------------------- */


    @media (max-width: 768px) {
        .page {
            grid-template-columns: 100% !important;
        }
    }

</style>
