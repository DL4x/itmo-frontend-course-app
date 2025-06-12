<script lang="ts">
    import type { Skill } from '$lib';

    interface Props {
        skills: Skill[];
    }

    const { skills }: Props = $props();

    const visibleSkills = skills.slice(0, 8);
</script>

<div class="skills-block">
    <div class="skills-title">[ Skills ]</div>

    {#if skills.length === 0}
        <div class="no-skills">
            <enhanced:img
                src="/static/images/UFONotFound.png"
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

<style>
    .skills-block {
        display: flex;
        flex-direction: column;
        padding: 10px;
    }

    .skills-title {
        margin: 5px 0 15px 10px;
        font-size: 1.5rem;
        font-weight: 600;
        color: #ffebe0;
    }

    .skills-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
        gap: 10px;
        margin-bottom: 10px;
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
</style>
