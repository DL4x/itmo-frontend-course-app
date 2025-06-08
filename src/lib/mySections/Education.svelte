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
            degree: 'Certificate of secondary general education',
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
</script>

<div class="block education-block">
    <div class="title education-title">Education</div>
    {#if educationItems.length > 0}
        <div class="education-content">
            {#each visibleEducationItems as item}
                <div class="education-item">
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
    <div class="button-container">
        <button class="read-more-btn" on:click={openModalEducation}> Read more </button>
    </div>
</div>

{#if activeBlockEducation}
    <div class="modal-backdrop" on:click|self={closeModalEducation}>
        <div class="modal">
            <h2>Education Details</h2>
            <div class="modal-education-content">
                {#each modalEducationItems as item, index}
                    <div class="education-item">
                        <div class="institution">{item.institution}</div>
                        <div class="degree">{item.degree}</div>
                        <div class="period">{item.period}</div>
                    </div>
                    {#if index < modalEducationItems.length - 1}
                        <hr class="divider" />
                    {/if}
                {/each}
            </div>
            <div class="modal-button-container">
                <button class="close-btn" on:click={closeModalEducation}> Close </button>
            </div>
        </div>
    </div>
{/if}

<style>
    .block {
        position: relative;
        /* background: #f0f0f0;
        border: 1px solid #ccc;
        padding: 10px; */
        box-sizing: border-box;
        min-width: 0;
        display: flex;
        flex-direction: column;
    }

    .education-title {
        text-align: center;
        margin-bottom: 15px;
        color: #333;
    }

    .education-content {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    .education-item {
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

    .button-container {
        position: relative;
        height: 30px;
    }

    .read-more-btn {
        /* float: right;  
        clear: both; */
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

    .modal-education-content {
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
