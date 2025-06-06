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

    function toggleView() {
        showCourses = !showCourses;
    }

    // const [send, receive] = crossfade({
    //     duration: 800,
    //     easing: quintOut
    // });

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
                <h1>Рады вас<br />видеть!</h1>
                <p>
                    Вы посетили сайт образовательных курсов по направлению фронтенда университета
                    ИТМО. Данный ресурс был создан выпускниками этих курсов.
                </p>
                <a
                    class="courses-btn"
                    onclick={toggleView}
                    onmouseenter={() => (isHovered = true)}
                    onmouseleave={() => (isHovered = false)}
                >
                    <p class="courses-btn-text">
                        {isHovered ? 'Погнали' : 'Список курсов'}
                    </p>
                </a>
            </div>

            <div class="right" in:fly={{ x: 100, duration: 800 }}>
                <Lottie
                    path="/src/images/starting_page/cosmonaut.json"
                    width="75%"
                    height="75%"
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
        display: flex;
        align-items: center;
        gap: 1vw;
        padding: 5%;
        padding-left: 10%;
        height: 95vh;
        box-sizing: border-box;
    }

    .left {
        display: flex;
        flex: 1;
        flex-direction: column;
        align-items: flex-start;
        gap: 52px;
    }

    .right {
        display: flex;
        flex: 2;
        flex-direction: column;
        align-items: flex-end;
    }

    h1 {
        font-weight: 700;
        font-size: 7rem;
        line-height: 100%;
        letter-spacing: -0.02em;
        color: var(--color-primary-50);
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
    }

    .courses-btn {
        width: 334px;
        height: 48px;
        display: flex;
        justify-content: center;

        background: var(--color-primary-700);
        box-shadow:
            0px 6px 4px rgba(38, 33, 33, 0.25),
            inset 0px -6px 4px rgba(0, 0, 0, 0.25);
        border-radius: 4px;
        transition: background-color 0.3s ease;
        cursor: pointer;
    }

    .courses-btn-text {
        font-style: normal;
        font-weight: 700;
        font-size: 20px;
        line-height: 16px;
        margin-top: 3%;
        color: var(--color-primary-50);
        transition: background-color 0.3s ease;
    }

    .courses-btn:hover {
        background-color: var(--color-gray-700);/*oklch(0.372 0.001 17.219 / 0.48);*/
    }

    .courses-btn:hover .courses-btn-text {
        transform: translateY(-1px);
        color: var(--color-primary-800);
    }

    .course-list-container {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1vw;
        height: 95vh;
        box-sizing: border-box;
    }
</style>
