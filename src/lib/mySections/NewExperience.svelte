<script lang="ts">
    interface ExperienceItem {
        company: string;
        period: string;
        description: string;
        position: string;
    }

    let activeBlockExperience = false;
    let modalExperienceItems: ExperienceItem[] = [];

    // Пример данных об опыте работы
    const experienceItems: ExperienceItem[] = [
        {
            company: 'Google',
            period: '2020 - 2022',
            description:
                'Worked as a frontend developer on Google Search team. Developed new UI components and optimized performance. Participated in design system development and accessibility improvements.',
            position: 'Frontend-разработчик'
        },
        {
            company: 'Microsoft',
            period: '2018 - 2020',
            description:
                'Junior full-stack developer on Azure team. Built internal tools and dashboards. Worked with React, TypeScript and .NET Core.',
            position: 'Frontend-разработчик'
        },
        {
            company: 'Freelance',
            period: '2016 - 2018',
            description:
                'Developed websites and web applications for small businesses. Technologies used: HTML, CSS, JavaScript, WordPress.',
            position: 'Frontend-разработчик'
        }
    ];

    // Берем только первые 2 пункта для основного отображения
    const visibleExperienceItems = experienceItems.slice(0, 1);
    const hiddenItemsCountExperience = experienceItems.length - visibleExperienceItems.length;

    // Функция для сокращения описания
    function truncateDescription(text: string, maxLength: number = 40): string {
        return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    }

    function openModalExperience(event: MouseEvent) {
        // event.preventDefault();
        modalExperienceItems = experienceItems;
        activeBlockExperience = true;
    }

    function closeModalExperience(event: MouseEvent) {
        // event.preventDefault();
        activeBlockExperience = false;
    }
</script>

<div class="block experience-block" on:click={openModalExperience}>
    <div class="title experience-title">[ Experience ]</div>
    {#if experienceItems.length > 0}
        <div class="experience-content">
            {#each visibleExperienceItems as item}
                <div class="experience-item">
                    <div class="main-info">
                        <div class="left-info">
                            <div class="company">{item.company}</div>
                            <div class="position">{item.position}</div>
                        </div>
                        <div class="period">{item.period}</div>
                    </div>
                    
                    <div class="description">{item.description}</div>
                </div>
            {/each}
        </div>
    {:else}
        <div class="no-experience">
            <img
                src="https://via.placeholder.com/100"
                alt="No experience"
                class="no-experience-img"
            />
            <div class="no-experience-text">Experience not found</div>
        </div>
    {/if}
    <!-- <div class="button-container">
        <button class="read-more-btn" on:click={openModalExperience}> Read more </button>
    </div> -->
</div>

{#if activeBlockExperience}
    <div class="modal-backdrop" on:click|self={closeModalExperience}>
        <div class="modal">
            <h2>Work Experience</h2>
            <div class="modal-experience-content">
                {#each modalExperienceItems as item, index}
                    <div class="experience-item">
                        <div class="company">{item.company}</div>
                        <div class="period">{item.period}</div>
                        <div class="description">{item.description}</div>
                        {#if index < modalExperienceItems.length - 1}
                            <hr class="divider" />
                        {/if}
                    </div>
                {/each}
            </div>
            <div class="modal-button-container">
                <button class="close-btn" on:click={closeModalExperience}> Close </button>
            </div>
        </div>
    </div>
{/if}

<style>
    .main-info {
        display: flex;
        justify-content: space-between;
        /* justify-items: center; */
    }

    .left-info {
        display: flex;
        flex-direction: column;
    }

    .position {
        margin-top: -10px;
    }

    .block {
        position: relative;
        /* background: #f0f0f0;
        border: 1px solid #ccc;
        padding: 10px; */
        box-sizing: border-box;
        min-width: 0;
        display: flex;
        flex-direction: column;

        flex: 1;
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

    .experience-block {
        display: flex;
        flex-direction: column;
    }

    .experience-title {
        /* text-align: center; */
        /* margin-bottom: 15px; */
        color: #333;

        font-size: 1.5rem;
        font-weight: 600;

        margin: 5px 0 15px 10px;
    }

    .experience-content {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 15px;
    }

    .experience-item {
        background: #f8f9fa;
        padding: 15px 5%;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .company {
        font-weight: bold;
        font-size: 1.5rem;
        margin-bottom: 5px;
        color: #2c3e50;
    }

    .period {
        color: #7f8c8d;
        font-size: 1rem;
        margin-bottom: 10px;

        align-content: center;
    }

    .description {
        color: #555;
        line-height: 1.5;
    }

    .no-experience {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 10px;
        color: #777;
    }

    .no-experience-img {
        width: 80px;
        opacity: 0.5;
    }

    .no-experience-text {
        font-size: 0.9rem;
    }

    .modal-experience-content {
        flex: 1;
        overflow-y: auto;
        padding-right: 10px;
    }

    .divider {
        border: none;
        border-top: 1px solid #eee;
        margin: 15px 0;
    }
</style>
