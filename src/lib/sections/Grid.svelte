<script lang="ts">
    import Profile from '$lib/mySections/Profile.svelte';
    import Education from '$lib/mySections/Education.svelte';
    import Experience from '$lib/mySections/Experience.svelte';
    import Skills from '$lib/mySections/Skills.svelte';
    import Lections from '$lib/mySections/Lections.svelte';
</script>

<div class="page">
    <div class="column column-1">
        <div class="block profile-block"><Profile /></div>
        <div class="block skills-block"><Skills /></div>
    </div>

    <div class="column column-2">
        <div class="block"><Education /></div>
        <div class="block"><Experience /></div>
        <div class="block"><Lections /></div>
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
        background: #f0f0f0;
        border: 5px solid #ccc;
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
