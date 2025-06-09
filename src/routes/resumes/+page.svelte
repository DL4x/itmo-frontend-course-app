<script lang="ts">
    import type {PageProps} from './$types';
    import '/src/app.css';

    const {data}: PageProps = $props();
</script>

<svelte:head>
    <title>О нас | Frontend Courses</title>
</svelte:head>

<main>
    <header class="flex flex-col items-center gap-4">
        <div class="main-g">Добро пожаловать на курс Frontend от ITMO</div>
        <p class=" text-stars">
            Отправляемся в цифровую вселенную! Наш курс — это стартовая площадка для будущих
            разработчиков, где теория встречается с практикой на орбите современных веб-технологий.
        </p>
    </header>

    <section class="authors-grid">
        {#each data.authors as author (author.id)}
            <a href="/resumes/{author.id}" class="author-card">
                <div class="author-avatar">
                    <span class="avatar-initial">{author.name[0]}</span>
                </div>
                <p class="author-name">{author.name}</p>
            </a>
        {/each}
    </section>
</main>

<style>
    .main-g {
        color: #ffffff;
        font-size: 3rem;
        font-weight: 700;
        text-align: center;
        background: linear-gradient(90deg, #6ee7ff, #a855f7);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
        margin-bottom: 1rem;
    }

    .text-stars {
        color: #e0e0ff;
        opacity: 0.9;
        line-height: 1.6;
    }

    main {
        max-width: 1200px;
        margin: 0 auto;
        padding: 2rem;
    }

    header {
        text-align: center;
        margin-bottom: 3rem;
    }

    /* Сетка карточек */
    .authors-grid {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 20px;
        padding: 20px;
        max-width: 1200px;
        margin: 0 auto;
    }

    /* Карточка преподавателя */
    .author-card {
        width: 220px;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 25px;
        background: var(--color-my-card-background);
        border-radius: 12px;
        border: 1px solid var(--color-my-card-border);
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        text-decoration: none;
        transition: all 0.3s ease;
    }

    .author-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 25px rgba(254, 138, 112, 0.2);
        border-color: rgba(254, 138, 112, 0.3);
    }

    /* Аватар */
    .author-avatar {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        background: linear-gradient(135deg, #fe8a70, #a855f7);
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 15px;
    }

    .avatar-initial {
        color: white;
        font-size: 32px;
        font-weight: bold;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    }

    .author-name {
        color: white;
        font-size: 18px;
        font-weight: 600;
        margin: 0;
        text-align: center;
        background: linear-gradient(90deg, #ffffff, #e0e0ff);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
    }

    /* Адаптивность */
    @media (max-width: 768px) {
        .author-card {
            width: 160px;
            padding: 20px;
        }

        .author-avatar {
            width: 60px;
            height: 60px;
        }

        .avatar-initial {
            font-size: 24px;
        }

        .author-name {
            font-size: 16px;
        }
    }
</style>
