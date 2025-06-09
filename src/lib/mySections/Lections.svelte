<script lang="ts">
    type Lection = {
        title: string;
        url: string;
    };

    const lections: Lection[] = [
        'Введение в Svelte',
        'Основы TypeScript', 
        'CSS Grid Layout',
        'Анимации в Web',
        'Оптимизация производительности',
        'Работа с API',
        'Тестирование компонентов',
        'State Management',
        'Web Components'
    ].map(title => ({ title, url: '#' }));

    let scrollPos = 0;
    const scrollStep = 400;

    const scroll = (direction: 'left' | 'right') => {
        const container = document.querySelector('.scroll-container');
        if (!container) return;

        const maxScroll = container.scrollWidth - container.clientWidth;
        scrollPos = Math.max(0, Math.min(maxScroll, scrollPos + (direction === 'left' ? -scrollStep : scrollStep)));
        container.scrollTo({ left: scrollPos, behavior: 'smooth' });
    };
</script>

<div class="lections-block">
    <h2 class="title">[ Lections ]</h2>
    
    {#if lections.length === 0}
        <div class="empty-state">
            <img src="https://via.placeholder.com/100" alt="No lections" />
            <div>Lections not found</div>
        </div>
    {:else}
        <div class="container">
            <button class="nav-btn" on:click={() => scroll('left')}>&lt;</button>
            
            <div class="scroll-container">
                {#each lections as { title, url }}
                    <a href={url} class="card" target="_blank" rel="noopener">
                        <div class="thumb">
                            <span>📚</span>
                        </div>
                        <span class="name">{title}</span>
                        <div class="hover-effect"></div>
                    </a>
                {/each}
            </div>
            
            <button class="nav-btn" on:click={() => scroll('right')}>&gt;</button>
        </div>
    {/if}
</div>

<style>
    .lections-block {
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
    }

    .scroll-container {
        display: flex;
        overflow-x: auto;
        scroll-behavior: smooth;
        gap: 15px;
        padding: 10px 0;
        scrollbar-width: none;
        -ms-overflow-style: none;
    }

    .scroll-container::-webkit-scrollbar {
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

    .nav-btn:first-child {
        margin-right: 10px;
    }

    .nav-btn:last-child {
        margin-left: 10px;
    }

    .card {
        position: relative;
        width: 160px;
        height: 200px;
        display: flex;
        flex-direction: column;
        flex-shrink: 0;
        background: white;
        border-radius: 12px;
        overflow: hidden;
        border: 1px solid #e2e8f0;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        text-decoration: none;
        color: #2d3748;
    }

    .card:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    }

    .thumb {
        width: 100%;
        height: 120px;
        display: grid;
        place-items: center;
        background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
        border-bottom: 1px solid #e2e8f0;
    }

    .thumb span {
        font-size: 3rem;
        opacity: 0.8;
    }

    .name {
        padding: 16px;
        text-align: center;
        font-size: 0.95rem;
        font-weight: 500;
        line-height: 1.4;
        flex-grow: 1;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .hover-effect {
        position: absolute;
        inset: auto 0 0 0;
        height: 4px;
        background: linear-gradient(90deg, #4f46e5, #10b981);
        transform: scaleX(0);
        transition: transform 0.3s ease;
    }

    .card:hover .hover-effect {
        transform: scaleX(1);
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

    @media (max-width: 768px) {
        .card {
            width: 160px;
            height: 200px;
        }

        .thumb {
            height: 100px;
        }
    }

    @media (max-width: 480px) {
        .card {
            width: 140px;
            height: 180px;
        }

        .thumb span {
            font-size: 2.5rem;
        }
    }
</style>