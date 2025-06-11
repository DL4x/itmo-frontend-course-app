<script lang="ts">
    import { fade, fly } from 'svelte/transition';
    import { quintOut } from 'svelte/easing';

    import type { Skill } from '$lib';

    const skills: Skill[] = $props();

    type SkillList = { name: string };

    const skillsList: SkillList[] = [
        'JavaScript',
        'TypeScript',
        'Svelte',
        'HTML/CSS',
        'React',
        'Node.js',
        'Git',
        'Docker',
        'Python'
    ].map((name) => ({ name }));

    const visibleSkills = skills.slice(0, 7);
    let showAllSkills = false;

    const toggleSkillsModal = () => (showAllSkills = !showAllSkills);
</script>

<div class="skills-block">
    <div class="skills-title">[ Skills ]</div>

    {#if skills.length === 0}
        <div class="no-skills">
            <enhanced:img
                src="/src/images/UFONotFound.png"
                width="80px"
                height="80px"
                alt="No skills"
            />
            <div>Skills not found</div>
        </div>
    {:else}
        <div class="skills-grid">
            {#each visibleSkills as { name }}
                <div class="skill-tag">
                    <span>{name}</span>
                </div>
            {/each}
        </div>
    {/if}
</div>

{#if showAllSkills}
    <div class="skills-modal-backdrop" transition:fade on:click|self={toggleSkillsModal}>
        <div class="skills-modal-window" transition:fly={{ y: 100, easing: quintOut }}>
            <div class="skills-modal-title">All Skills</div>
            <div class="skills-modal-grid">
                {#each skills as { name }}
                    <div class="skill-tag">
                        <span>{name}</span>
                    </div>
                {/each}
            </div>
        </div>
    </div>
{/if}

<style>
    .skills-block {
        display: flex;
        flex-direction: column;
        padding: 10px;
    }

    .skills-title,
    .skills-modal-title {
        margin: 5px 0 15px 10px;
        font-size: 1.5rem;
        font-weight: 600;
        color: #ffebe0;
    }

    .skills-grid,
    .skills-modal-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
        gap: 10px;
        margin-bottom: 10px;
    }

    .skills-modal-grid {
        padding-right: 10px;
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
        overflow: auto;
    }

    .skills-show-more {
        background: var(--color-primary-700);
        color: white;
        border-radius: 50%;
        width: 45px;
        height: 45px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        font-size: 1.3rem;
        transition: all 0.3s ease;
        place-self: center;
    }

    .skills-show-more:hover {
        background: #f34e31;
        transform: translateY(-3px);
    }

    .skills-modal-backdrop {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.5);
        display: grid;
        place-items: center;
        z-index: 1000;
    }

    .skills-modal-window {
        background: white;
        padding: 20px;
        border-radius: 8px;
        width: 60%;
        max-width: 500px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
        display: flex;
        flex-direction: column;
        min-height: 300px;
        max-height: 600px;
    }

    .skills-close-btn {
        align-self: flex-end;
        padding: 8px 16px;
        background: #f44336;
        color: white;
        border: none;
        border-radius: 3px;
        cursor: pointer;
        transition: all 0.2s;
    }

    .skills-close-btn:hover {
        background: #d32f2f;
        transform: scale(1.05);
    }

    .skill-tag {
        display: inline-flex;
        padding: 10px 18px;
        background: rgba(51, 69, 161, 0.2);
        border: 1px solid #3b3b8a;
        border-radius: 8px;
        color: white;
        transition: all 0.3s ease;
        margin: 5px;
        justify-content: center;
        align-items: center;
    }

    .skill-tag:hover {
        transform: translateY(-3px);
        box-shadow:
            0 4px 8px rgba(0, 0, 0, 0.15),
            0 8px 24px rgba(0, 0, 0, 0.12);
    }

    .skill-tag span {
        font-weight: 600;
        color: white;
        font-size: 0.95rem;
        text-align: center;
    }

    .no-skills {
        display: grid;
        place-items: center;
        gap: 10px;
        color: #777;
    }

    .no-skills img {
        width: 80px;
        opacity: 0.5;
    }
</style>
