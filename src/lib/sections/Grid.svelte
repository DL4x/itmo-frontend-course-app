<script lang="ts">
    import Profile from '$lib/mySections/Profile.svelte';
    import Education from '$lib/mySections/Education.svelte';
    import Experience from '$lib/mySections/Experience.svelte';
    import Skills from '$lib/mySections/Skills.svelte';
    import Lections from '$lib/mySections/Lections.svelte';

    import type { Author } from '$lib';

    const {
        name,
        companies,
        educations,
        skills,
        progressBars,
        favourites,
        address,
        phone,
        email,
        authorBirthday,
        authorCity,
        authorDescription
    }: Author = $props();
</script>

<div class="page">
    <div class="column column-1">
        <div class="block profile-block">
            <Profile
                {name}
                {address}
                {phone}
                {email}
                {authorBirthday}
                {authorCity}
                {authorDescription}
            />
        </div>
        <div class="block skills-block">
            <Skills {...skills} />
        </div>
    </div>

    <div class="column column-2">
        <div class="block">
            <Education {...educations} />
        </div>
        <div class="block">
            <Experience {...companies} />
        </div>
        <div class="block">
            <Lections />
        </div>
    </div>
</div>

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
        margin-top: 10px;
    }

    .block {
        position: relative;
        background: rgba(20, 30, 80, 0.5);
        box-shadow: 0 0 30px rgba(100, 70, 255, 0.2);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(100, 150, 255, 0.2);
        padding: 10px;
        box-sizing: border-box;
        min-width: 0;
        display: flex;
        flex-direction: column;
        border-radius: 25px;
    }

    .profile-block {
        justify-content: center;
    }

    @media (max-width: 1300px) {
        .page {
            grid-template-columns: 100% !important;
        }
    }
</style>
