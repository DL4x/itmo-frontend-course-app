<script lang="ts">
    interface EducationItem {
        institution: string;
        degree: string;
        period: string;
    }

    let activeBlockEducation = false;
    let modalEducationItems: EducationItem[] = [];

    // Пример данных об образовании
    const educationItems: EducationItem[] = [
        {
            institution: 'Samara Lyceum',
            degree: 'Certificate of secondary general education ',
            period: '2018 - 2022'
        },
        {
            institution: 'Stanford University',
            degree: 'Bachelor of Computer Science',
            period: '2022 - 2026'
        },
        {
            institution: 'MIT',
            degree: 'Master of Artificial Intelligence',
            period: '2026 - 2028'
        }
    ];

    // Берем только первые 2 пункта для основного отображения
    const visibleEducationItems = educationItems.slice(0, 2);
    const hiddenItemsCountEducation = educationItems.length - visibleEducationItems.length;

    function openModalEducation() {
        modalEducationItems = educationItems;
        activeBlockEducation = true;
    }

    function closeModalEducation() {
        activeBlockEducation = false;
    }




    import { fade, fly } from 'svelte/transition';
    import { quintOut } from 'svelte/easing';
</script>

<div class="block" on:click={openModalEducation}>
    <div class="title">Education</div>
    {#if educationItems.length > 0}
        <div class="content">
            {#each visibleEducationItems as item}
                <div class="item">
                    <div class="institution">{item.institution}</div>
                    <div class="degree">{item.degree}</div>
                    <div class="period">{item.period}</div>
                </div>
            {/each}
        </div>
    {:else}
        <div class="no-education">
            <img
                src="https://via.placeholder.com/100"
                alt="No education"
                class="no-education-img"
            />
            <div class="no-education-text">Education not found</div>
        </div>
    {/if}
</div>




{#if activeBlockEducation}
    <div transition:fade={{ duration: 300 }} class="modal-backdrop" on:click|self={closeModalEducation}>
        <div transition:fly={{ y: 100, duration: 300, easing: quintOut }} class="modal-window">
            <div class="modal-title">Education</div>
            <div class="modal-content">
                {#each modalEducationItems as item, index}
                    <div class="modal-item">
                        <div class="institution">{item.institution}</div>
                        <div class="degree">{item.degree}</div>
                        <div class="period">{item.period}</div>
                    </div>
                {/each}
            </div>
            <div class="modal-button-container">
                <button class="modal-close-btn" on:click={closeModalEducation}>
                    Close
                </button>
            </div>
        </div>
    </div>
{/if}

<style>
    .block {
        position: relative;
        box-sizing: border-box;
        min-width: 0;
        display: flex;
        flex-direction: column;
        gap: 15px;

        flex: 1;

        cursor: pointer;
    }

    .title,
    .modal-title {
        text-align: center;
        color: #333;

        font-size: 1.5rem;
        font-weight: 600;
    }

    .content,
    .modal-content {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 15px;
        /* justify-content: center; */
    }

    .modal-content {
        padding-right: 10px;
    }

    .item,
    .modal-item {
        background: #f8f9fa;
        padding: 15px;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .institution {
        font-weight: bold;
        font-size: 1.1rem;
        margin-bottom: 5px;
        color: #2c3e50;
    }

    .degree {
        font-style: italic;
        margin-bottom: 5px;
        color: #555;
    }

    .period {
        color: #7f8c8d;
        font-size: 0.9rem;
    }

    .modal-backdrop {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;

        animation: fadeIn 0.3s forwards;
    }

    @keyframes fadeIn {
        to { background: rgba(0, 0, 0, 0.5); }
    }

    .modal-window {
        background: #f0f0f0;
        padding: 20px;
        border-radius: 8px;
        width: 60%;
        max-width: 500px;
        min-height: 300px;
        max-height: 600px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
        display: flex;
        flex-direction: column;
        gap: 15px;
        
        position: relative;
    }

    .modal-button-container {
        display: flex;
        justify-content: flex-end;
    }

    .modal-close-btn {
        padding: 8px 16px;
        background: #f44336;
        color: white;
        border: none;
        border-radius: 3px;
        cursor: pointer;
        font-size: 14px;

        transition: transform 0.2s, background-color 0.2s;
    }

    .modal-close-btn:hover {
        background: #d32f2f;
        
        transform: scale(1.05);
    }

    .page.dimmed {
        filter: brightness(0.7);
        pointer-events: none;
        user-select: none;
    }

    






    .no-education {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 10px;
        color: #777;
    }

    .no-education-img {
        width: 80px;
        opacity: 0.5;
    }

    .no-education-text {
        font-size: 0.9rem;
    }
</style>
