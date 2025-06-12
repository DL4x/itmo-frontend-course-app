<script lang="ts">
    import type {PageProps} from './$types';
    import {Card} from 'flowbite-svelte';
    import {fly} from 'svelte/transition';
    import '/src/app.css';
    import Lottie from '$lib/Lottie.svelte';
    import {quintOut} from 'svelte/easing';
    import {onMount} from 'svelte';

    let ready = $state(false);
    onMount(() => (ready = true));

    let isHovered = $state(false);
    let showCourses = $state(false);

    async function toggleView() {
        showCourses = !showCourses;
    }

    const {data}: PageProps = $props();
</script>

<svelte:head>
    <title>ITMO Frontend Course</title>
</svelte:head>

{#if !showCourses}
    <section
        class="greeting-page-container"
        transition:fly={{ x: -1000, duration: 800, easing: quintOut }}
    >
        {#if ready}
            <div class="left" in:fly={{ x: -100, duration: 800 }}>
                <h1>Добро пожаловать в мир фронтенд-разработки!</h1>
                <p>
                    Вы на образовательном портале от выпускников ИТМО - здесь мы делимся знаниями,
                    которые реально работают в индустрии. Готовы начать путь от основ до продвинутых
                    техник?
                </p>
                <button
                    class="courses-btn"
                    onclick={toggleView}
                    onmouseenter={() => (isHovered = true)}
                    onmouseleave={() => (isHovered = false)}
                >
                    <span class="courses-btn-text">
                        {isHovered ? 'Погнали' : 'Список курсов'}
                    </span>
                    <span class="hover-effect"></span>
                </button>
            </div>

            <div class="right" in:fly={{ x: 100, duration: 800 }}>
                <Lottie
                    path="/cosmonaut/cosmonaut.json"
                    mirrored={true}
                />
            </div>
        {/if}
    </section>
{:else}
    <section class="course-list-container" in:fly={{ x: 1000, duration: 800, easing: quintOut }}>
        <div class="courses-grid">
            {#each data.courses as course (course.id)}
                <Card
                    class="my-card overflow-hidden"
                    href="/courses/{course.id}"
                >
                    <img
                        src={course.coursePreviewUrl ?? '/images/blank.webp'}
                        style="width: 400px; min-height: 200px; object-fit: cover; border-radius: 4px"
                        alt="Course preview"
                    />
                    <h5 class="mb-2 mt-2 text-2xl font-bold course-title tracking-tight">
                        {course.courseName}
                    </h5>
                    <p class="mb-3 font-normal course-description leading-tight">
                        {course.courseDescription}
                    </p>
                </Card>
            {/each}
        </div>
    </section>

{/if}

<style>
    :global(html) {
        font-size: 16px;
    }

    .course-title {
        color: var(--color-primary-300);
    }

    .course-description {
        color: var(--color-primary-100);
    }

    .greeting-page-container {
        display: grid;
        grid-template-columns: 1fr 1fr;
        align-items: center;
        gap: 2rem;
        padding: 2rem 5%;
        min-height: 100vh;
        box-sizing: border-box;
    }

    .left {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        max-width: 100%;
    }

    .right {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .lottie-animation {
        width: 100%;
        max-width: 40rem;
        height: auto;
        aspect-ratio: 1/1;
    }

    h1 {
        font-weight: 700;
        font-size: clamp(2rem, 5vw, 3rem);
        line-height: 1.2;
        letter-spacing: -0.02em;
        color: var(--color-primary-50);
        margin: 0;
    }

    p {
        font-weight: 400;
        font-size: clamp(1rem, 1.5vw, 1.2rem);
        line-height: 1.5;
        color: #c9ada7;
        margin: 0;
    }

    .courses-btn {
        position: relative;
        width: 100%;
        max-width: 280px;
        height: 56px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 8px;
        background: var(--color-primary-500);
        overflow: hidden;
        cursor: pointer;
        transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        border: none;
        margin-top: 1rem;
    }

    .courses-btn-text {
        position: relative;
        z-index: 2;
        font-weight: 600;
        font-size: clamp(1rem, 1.1vw, 1.125rem);
        letter-spacing: 0.5px;
        color: white;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .hover-effect {
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
        transition: 0.5s;
    }

    .courses-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    }

    .courses-btn:hover .hover-effect {
        left: 100%;
    }

    .courses-btn:active {
        transform: translateY(0);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .courses-btn-text::after {
        content: '→';
        opacity: 0;
        transition: opacity 0.3s ease, transform 0.3s ease;
        transform: translateX(-10px);
    }

    .courses-btn:hover .courses-btn-text::after {
        opacity: 1;
        transform: translateX(0);
    }

    .course-list-container {
        display: flex;
        justify-content: center;
        align-items: flex-start;
        padding: 2rem 5%;
        min-height: 100vh;
        box-sizing: border-box;
        width: 100%;
    }

    .courses-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 2rem;
        width: 100%;
        max-width: 1200px;
    }

    @media (max-width: 1024px) {
        .greeting-page-container {
            grid-template-columns: 1fr;
            grid-template-rows: auto auto;
            gap: 3rem;
            padding: 3rem 5%;
        }

        .left {
            order: 2;
            text-align: center;
            align-items: center;
        }

        .right {
            order: 1;
        }

        .lottie-animation {
            max-width: 30rem;
        }

        .courses-btn {
            margin: 0 auto;
        }
    }

    @media (max-width: 640px) {
        .greeting-page-container {
            padding: 2rem 1.5rem;
            gap: 2rem;
        }

        h1 {
            font-size: 2rem;
        }

        p {
            font-size: 1rem;
        }

        .courses-grid {
            grid-template-columns: 1fr;
        }

        .lottie-animation {
            max-width: 20rem;
        }
    }

    @media (max-width: 400px) {
        .courses-btn {
            height: 48px;
            max-width: 240px;
        }

        .courses-btn-text {
            font-size: 0.9rem;
        }
    }
</style>
