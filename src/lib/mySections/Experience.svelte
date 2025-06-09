<script lang="ts">
    type Experience = {
        company: string;
        position: string;
        period: string;
        description: string;
    };

    const experiences: Experience[] = [
        {
            company: 'Google',
            position: 'Frontend-разработчик',
            period: '2020 - 2022',
            description:
                'Worked as a frontend developer on Google Search team. Developed new UI components and optimized performance. Participated in design system development and accessibility improvements.'
        },
        {
            company: 'Microsoft',
            position: 'Frontend-разработчик',
            period: '2018 - 2020',
            description:
                'Junior full-stack developer on Azure team. Built internal tools and dashboards. Worked with React, TypeScript and .NET Core.'
        },
        {
            company: 'Freelance',
            position: 'Frontend-разработчик',
            period: '2016 - 2018',
            description:
                'Developed websites and web applications for small businesses. Technologies used: HTML, CSS, JavaScript, WordPress.'
        },
        {
            company: 'Microsoft',
            period: '2018 - 2020',
            description:
                'Junior full-stack developer on Azure team. Built internal tools and dashboards. Worked with React, TypeScript and .NET Core.',
            position: 'Frontend-разработчик'
        },
        {
            company: 'Microsoft',
            period: '2018 - 2020',
            description:
                'Junior full-stack developer on Azure team. Built internal tools and dashboards. Worked with React, TypeScript and .NET Core.',
            position: 'Frontend-разработчик'
        }
    ];

    let scrollPos = 0;
    let cardWidth = 735;

    // Получаем ширину карточки после рендера
    function getCardWidth() {
        const card = document.querySelector('.card');
        return card?.clientWidth || 735; // Возвращаем дефолтное значение, если карточка не найдена
    }

    const scroll = (direction: 'left' | 'right') => {
        const container = document.querySelector('.experience-scroll-container');
        if (!container) return;

        // Обновляем ширину карточки перед скроллом
        cardWidth = getCardWidth() + 15; // + gap между карточками

        const maxScroll = container.scrollWidth - container.clientWidth;
        scrollPos = Math.max(
            0,
            Math.min(maxScroll, scrollPos + (direction === 'left' ? -cardWidth : cardWidth))
        );
        container.scrollTo({ left: scrollPos, behavior: 'smooth' });
    };
</script>

<div class="experience-block">
    <h2 class="title">[ Experience ]</h2>

    {#if experiences.length === 0}
        <div class="empty-state">
            <img src="https://via.placeholder.com/100" alt="No experience" />
            <div>Experience not found</div>
        </div>
    {:else}
        <div class="container">
            <button class="nav-btn left" on:click={() => scroll('left')}>&lt;</button>

            <div class="experience-scroll-container">
                {#each experiences as { company, position, period, description }}
                    <article class="card">
                        <header>
                            <div>
                                <div class="company">{company}</div>
                                <div class="position">{position}</div>
                            </div>
                            <time class="period">{period}</time>
                        </header>
                        <p class="desc">{description}</p>
                    </article>
                {/each}
            </div>

            <button class="nav-btn right" on:click={() => scroll('right')}>&gt;</button>
        </div>
    {/if}
</div>

<style>
    .experience-block {
        display: flex;
        flex-direction: column;
    }

    .title {
        margin: 5px 0 15px 10px;
        font-size: 1.5rem;
        font-weight: 600;
        color: #333;
    }

    .container {
        display: flex;
        align-items: center;
        width: 100%;
    }

    .experience-scroll-container {
        display: flex;
        overflow-x: auto;
        scroll-behavior: smooth;
        gap: 15px;
        padding: 20px 0;
        scrollbar-width: none;
        width: 100%;
    }

    .experience-scroll-container::-webkit-scrollbar {
        display: none;
    }

    .nav-btn {
        background: white;
        border: 1px solid #ddd;
        border-radius: 50%;
        width: 30px;
        height: 30px;
        display: grid;
        flex-shrink: 0;
        place-items: center;
        cursor: pointer;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .nav-btn:hover {
        background: #f5f5f5;
    }

    .nav-btn.left {
        margin-right: 10px;
    }

    .nav-btn.right {
        margin-left: 10px;
    }

    .card {
        background: #f8f9fa;
        padding: 15px 5%;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        flex-shrink: 0;
        width: 100%;
    }

    .card header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
    }

    .company {
        font-weight: bold;
        font-size: 1.5rem;
        color: #2c3e50;
    }

    .period {
        color: #7f8c8d;
        align-self: center;
    }

    .desc {
        color: #555;
        line-height: 1.5;
    }

    .empty-state {
        display: grid;
        place-items: center;
        gap: 10px;
        color: #777;
    }

    .empty-state img {
        width: 80px;
        opacity: 0.5;
    }
</style>
