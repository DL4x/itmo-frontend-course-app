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
    const visibleEducationItems = educationItems.slice(0, 1);
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

<div class="block">
    <div class="up-block">
        <div class="title">[ Education ]</div>
        <button class="info-dots" on:click={openModalEducation}>
            <span class="dot"></span>
            <span class="dot"></span>
            <span class="dot"></span>
        </button>
    </div>
    {#if educationItems.length > 0}
        <!-- <div class="content">
            {#each visibleEducationItems as item}
                <div class="item">
                    <div class="institution">{item.institution}</div>
                    <div class="degree">{item.degree}</div>
                    <div class="period">{item.period}</div>
                </div>
            {/each}
        </div> -->
        <div class="timeline-container">
            <div class="timeline-line"></div>
            {#each educationItems as item, index}
                <div class="timeline-item">
                    <div class="timeline-marker"></div>
                    <div class="period">{item.period}</div>
                    <div class="timeline-content">
                        <h3 class="institution">{item.institution}</h3>
                        <p class="degree">{item.degree}</p>
                    </div>
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
    <div
        transition:fade={{ duration: 300 }}
        class="modal-backdrop"
        on:click|self={closeModalEducation}
    >
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
                <button class="modal-close-btn" on:click={closeModalEducation}> Close </button>
            </div>
        </div>
    </div>
{/if}

<style>
    .up-block {
        display: flex;
        justify-content: space-between;
        align-items: center;
        /* justify-content: center; */
        
    }

    .info-dots {
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    border-radius: 50%;
    transition: all 0.3s ease;

    margin-right: 5%;
  }
  
  .info-dots:hover {
    background: red;
  }
  
  .info-dots:active {
    transform: scale(0.95);
  }
  
  .dot {
    width: 8px;
    height: 8px;
    background-color: #4a5568;
    border-radius: 50%;
    margin: 0 2px;
    /* margin-right: 6px; */
  }




    .block {
        position: relative;
        box-sizing: border-box;
        min-width: 0;
        display: flex;
        flex-direction: column;
        /* gap: 15px; */

        flex: 1;

        /* cursor: pointer; */
    }

    .title,
    .modal-title {
        /* text-align: center; */
        margin: 5px 0 15px 10px;
        color: #333;

        font-size: 1.5rem;
        font-weight: 600;
    }

    .timeline-container {
        position: relative;
        display: flex;
        justify-content: space-between;
        padding: 20px 0;
    }

    .timeline-line {
        position: absolute;
        left: 0;
        right: 0;
        top: 10px;
        height: 4px;
        background: #e2e8f0;
        z-index: 1;
    }

    .timeline-item {
        position: relative;
        display: flex;
        flex-direction: column;
        /* align-items: center; */
        min-width: 200px;
        padding: 0 20px;
        z-index: 2;

        margin-top: -15px;
        flex: 1;
    }

    .timeline-marker {
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: #4f46e5;
        border: 3px solid white;
        box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.3);
        margin-bottom: 20px;

        align-self: flex-start;
    }

    .timeline-content {
        /* text-align: center;
        padding: 1.5rem;
        background: white;
        border-radius: 8px;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        border: 1px solid #e2e8f0;
        width: 100%; */

        display: flex;
        flex-direction: column;
        gap: 1px;
    }

    .period {
        color: #4f46e5;
        font-weight: 600;
        margin-bottom: 0.5rem;

        margin-top: -15px;
        font-size: medium;
    }

    .institution {
        font-weight: bold;
        font-size: 1.5rem;
        color: #1a202c;
        /* margin: 0 0 0.5rem 0; */
    }

    .degree {
        color: #4a5568;
        line-height: 1.5;
        /* font-style: italic; */

        line-height: 1.1rem;
    }

    /* Адаптивность */
    @media (max-width: 768px) {
        .timeline-item {
            min-width: 160px;
            padding: 0 10px;
        }

        .timeline-content {
            padding: 1rem;
        }
    }

    @media (max-width: 480px) {
        .education-header {
            font-size: 1.5rem;
        }

        .timeline-item {
            min-width: 140px;
        }
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

    /* .institution {
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
    } */

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
        to {
            background: rgba(0, 0, 0, 0.5);
        }
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

        transition:
            transform 0.2s,
            background-color 0.2s;
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
