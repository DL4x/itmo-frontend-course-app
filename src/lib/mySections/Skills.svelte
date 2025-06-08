<script lang="ts">
    interface SkillItem {
        name: string;
        level?: number; // Опционально: уровень владения от 1 до 5
    }

    let activeModalSkills = false;

    // Пример данных о навыках
    const skillsItems: SkillItem[] = [
        { name: 'JavaScript', level: 5 },
        { name: 'TypeScript', level: 4 },
        { name: 'Svelte', level: 4 },
        { name: 'HTML/CSS', level: 5 },
        { name: 'React', level: 3 },
        { name: 'Node.js', level: 4 },
        { name: 'Git', level: 4 },
        { name: 'Docker', level: 3 },
        { name: 'Python', level: 2 }
    ];

    // Берем только первые 6 навыков для основного отображения
    const visibleSkills = skillsItems.slice(0, 6);
    const hiddenSkillsCount = skillsItems.length - visibleSkills.length;

    function openModalSkills(event: MouseEvent) {
        // event.preventDefault();
        activeModalSkills = true;
    }

    function closeModalSkills(event: MouseEvent) {
        // event.preventDefault();
        activeModalSkills = false;
    }
</script>

<div class="block skills-block">
    <div class="title skills-title">Skills</div>

    {#if skillsItems.length > 0}
        <div class="skills-grid">
            {#each visibleSkills as skill}
                <div class="skill-tag">
                    {skill.name}
                    {#if skill.level}
                        <span class="skill-level"
                            >{'★'.repeat(skill.level)}{'☆'.repeat(5 - skill.level)}</span
                        >
                    {/if}
                </div>
            {/each}
        </div>
    {:else}
        <div class="no-skills">
            <img src="https://via.placeholder.com/100" alt="No skills" class="no-skills-img" />
            <div class="no-skills-text">Skills not found</div>
        </div>
    {/if}
    <div class="button-container">
        <button class="read-more-btn" on:click={openModalSkills}> Read more </button>
    </div>
</div>

{#if activeModalSkills}
    <div class="modal-backdrop" on:click|self={closeModalSkills}>
        <div class="modal">
            <h2>All Skills</h2>
            <div class="modal-skills-grid">
                {#each skillsItems as skill}
                    <div class="skill-tag">
                        {skill.name}
                        {#if skill.level}
                            <span class="skill-level"
                                >{'★'.repeat(skill.level)}{'☆'.repeat(5 - skill.level)}</span
                            >
                        {/if}
                    </div>
                {/each}
            </div>
            <div class="modal-button-container">
                <button class="close-btn" on:click={closeModalSkills}> Close </button>
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

    .skills-block {
        display: flex;
        flex-direction: column;
    }

    .skills-title {
        text-align: center;
        margin-bottom: 15px;
        color: #333;
    }

    .skills-grid,
    .modal-skills-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
        gap: 10px;
        margin-bottom: 10px;
    }

    .skill-tag {
        border: 1px solid #4caf50;
        border-radius: 20px;
        padding: 8px 12px;
        text-align: center;
        font-size: 0.9rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4px;
    }

    .skill-level {
        color: #ffc107;
        font-size: 0.8rem;
        letter-spacing: 2px;
    }

    .no-skills {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 10px;
        color: #777;
    }

    .no-skills-img {
        width: 80px;
        opacity: 0.5;
    }

    .no-skills-text {
        font-size: 0.9rem;
    }

    .modal-skills-grid {
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    }
</style>
