<script lang="ts">
    import type { PageProps } from './$types';
    import { Button, Card } from 'flowbite-svelte';
    import { fly } from 'svelte/transition';
    import '/src/app.css';
    import Lottie from '$lib/Lottie.svelte';
    import { quintOut } from 'svelte/easing';
    import { onMount } from 'svelte';

    let ready = $state(false);
    onMount(() => (ready = true));

    let isHovered = $state(false);
    let showCourses = $state(false);

    async function toggleView() {
        showCourses = !showCourses;
    }

    const { data }: PageProps = $props();
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
                <a
                    class="courses-btn"
                    on:click={toggleView}
                    on:mouseenter={() => (isHovered = true)}
                    on:mouseleave={() => (isHovered = false)}
                >
                    <span class="courses-btn-text">
                        {isHovered ? 'Погнали' : 'Список курсов'}
                    </span>
                    <span class="hover-effect"></span>
                </a>
            </div>

            <div class="right" in:fly={{ x: 100, duration: 800 }}>
                <Lottie
                    path="/src/images/starting_page/cosmonaut.json"
                    width="40rem"
                    height="40rem"
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
                    img={course.coursePreviewUrl ?? '/src/images/starting_page/paste_picture.webp'}
                    class="border-1 border-[#B1B5C3] rounded-xl transition-transform hover:-translate-y-1 overflow-hidden"
                >
                    <h5
                        class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
                    >
                        {course.courseName}
                    </h5>
                    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight">
                        Здесь вы ознакомитесь с основами
                    </p>
                    <Button
                        href="/courses/{course.documentId}"
                        class="bg-black text-white rounded-full px-6 py-2 w-32 transition cursor-pointer"
                    >
                        Подробнее
                    </Button>
                </Card>
            {/each}
        </div>
    </section>
{/if}

<style>
    .greeting-page-container {
        display: grid;
        grid-template-columns: 1fr 1fr;
        align-items: center;
        gap: 1vw;
        padding: 5%;
        padding-left: 10%;
        height: 95vh;
        box-sizing: border-box;
    }

    .left {
        grid-column: 1;
        display: grid;
        grid-template-rows: auto auto auto;
        gap: 2rem;
        max-width: 100rem;
    }

    .right {
        grid-column: 2;
        display: grid;
        justify-items: end;
    }

    h1 {
        font-weight: 700;
        font-size: 3rem;
        line-height: 100%;
        letter-spacing: -0.02em;
        color: var(--color-primary-50);
        margin-right: 2rem;
        grid-row: 1;
    }

    h2 {
        font-weight: 550;
        font-size: 4rem;
        line-height: 100%;
        letter-spacing: -0.02em;
        color: #141416;
    }

    p {
        font-weight: 400;
        font-size: 1.2rem;
        line-height: 150%;
        color: #c9ada7;
        grid-row: 2;
    }

    .courses-btn {
        position: relative;
        width: 280px;
        height: 56px;
        display: grid;
        place-items: center;
        border-radius: 8px;
        background: var(--color-primary-500);
        overflow: hidden;
        cursor: pointer;
        transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        border: none;
        grid-row: 3;
    }

    .courses-btn-text {
        position: relative;
        z-index: 2;
        font-weight: 600;
        font-size: 18px;
        letter-spacing: 0.5px;
        color: white;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
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

    /* Анимации */
    .courses-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
        color: var(--color-primary-700);
    }

    .courses-btn:hover .hover-effect {
        left: 100%;
    }

    .courses-btn:active {
        transform: translateY(0);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    /* Иконка стрелки (опционально) */
    .courses-btn-text::after {
        content: '→';
        opacity: 0;
        transition:
            opacity 0.3s ease,
            transform 0.3s ease;
        transform: translateX(-10px);
    }

    .courses-btn:hover .courses-btn-text::after {
        opacity: 1;
        transform: translateX(0);
    }

    .course-list-container {
        display: grid;
        place-items: center;
        gap: 1vw;
        height: 95vh;
        box-sizing: border-box;
    }

    @media (max-width: 1080px) {
    }

    @media (max-width: 768px) {
        .greeting-page-container {
            grid-template-columns: 1fr;
            grid-template-rows: auto auto;
            padding: 5%;
            height: auto;
            min-height: 95vh;
            gap: 3rem;
        }

        .left {
            grid-row: 2;
            grid-column: 1;
            max-width: 100%;
            text-align: center;
        }

        .right {
            grid-row: 1;
            grid-column: 1;
            justify-items: center;
            width: 100%;
        }

        .lottie-container {
            max-width: 300px;
        }

        .courses-btn {
            justify-self: center;
        }
    }
</style>
