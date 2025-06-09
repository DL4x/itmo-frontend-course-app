<script lang="ts">
    interface SkillItem {
        name: string;
        level?: number; // Опционально: уровень владения от 1 до 5
    }

    let activeModalSkills = false;

    // Пример данных о навыках
    const skillsItems: SkillItem[] = [
        {name: 'JavaScript', level: 5},
        {name: 'TypeScript', level: 4},
        {name: 'Svelte', level: 4},
        {name: 'HTML/CSS', level: 5},
        {name: 'React', level: 3},
        {name: 'Node.js', level: 4},
        {name: 'Git', level: 4},
        {name: 'Docker', level: 3},
        {name: 'Python', level: 2}
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


    import {fade, fly} from 'svelte/transition';
    import {quintOut} from 'svelte/easing';

</script>

<div class="block" on:click={openModalSkills}>
    <div class="title">[ Skills ]</div>

    {#if skillsItems.length > 0}
        <div class="grid">
            {#each visibleSkills as skill}
                <div class="skill-tag">
                    <span class="skill-name">{skill.name}</span>
                    <!-- {#if skill.level}
                        <div class="skill-level-container">
                            <span class="skill-level" style="--level: {skill.level}">
                                {'★'.repeat(skill.level)}{'☆'.repeat(5 - skill.level)}
                            </span>
                        </div>
                    {/if} -->
                </div>
            {/each}
        </div>
    {:else}
        <div class="no-skills">
            <img src="https://via.placeholder.com/100" alt="No skills" class="no-skills-img"/>
            <div class="no-skills-text">Skills not found</div>
        </div>
    {/if}
</div>

{#if activeModalSkills}
    <div class="modal-backdrop" transition:fade={{ duration: 300 }} on:click|self={closeModalSkills}>
        <div class="modal-window" transition:fly={{ y: 100, duration: 300, easing: quintOut }}>
            <div class="modal-title">All Skills</div>
            <div class="modal-grid">
                {#each skillsItems as skill}
                    <div class="skill-tag">
                        <span class="skill-name">{skill.name}</span>
                        <!-- {#if skill.level}
                            <div class="skill-level-container">
                                <span class="skill-level" style="--level: {skill.level}">
                                    {'★'.repeat(skill.level)}{'☆'.repeat(5 - skill.level)}
                                </span>
                            </div>
                        {/if} -->
                    </div>
                {/each}
            </div>
            <div class="modal-button-container">
                <button class="close-btn" on:click={closeModalSkills}> Close</button>
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

        flex: 1;

        cursor: pointer;
    }

    .title,
    .modal-title {
        /* text-align: center; */
        margin: 5px 0 15px 10px;
        color: #333;
        font-size: 1.5rem;
        font-weight: 600;
    }

    .grid,
    .modal-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
        gap: 10px;
        margin-bottom: 10px;
    }

    .modal-grid {
        padding-right: 10px;
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
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

        animation: fadeIn 0.3s forwards;
    }

    @keyframes fadeIn {
        to {
            background: rgba(0, 0, 0, 0.5);
        }
    }

    .modal-window {
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

        transition: transform 0.2s, background-color 0.2s;
    }

    .close-btn:hover {
        background: #d32f2f;

        transform: scale(1.05);
    }

    .page.dimmed {
        filter: brightness(0.7);
        pointer-events: none;
        user-select: none;
    }

    .skill-tag {
        display: inline-flex;
        flex-direction: column;
        align-items: center;
        background: white;
        border-radius: 24px;
        padding: 10px 18px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1),
        0 4px 12px rgba(0, 0, 0, 0.08);
        transition: all 0.3s ease;
        border: 1px solid #e0e0e0;
        margin: 5px;
        position: relative;
        overflow: hidden;
    }

    .skill-tag:hover {
        transform: translateY(-3px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15),
        0 8px 24px rgba(0, 0, 0, 0.12);
    }

    .skill-name {
        font-weight: 600;
        color: #4a5568;
        font-size: 0.95rem;
        margin-bottom: 4px;
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
</style>
