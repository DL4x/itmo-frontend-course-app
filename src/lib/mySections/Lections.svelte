<script lang="ts">
    import type { Presentation } from '$lib';

    const lections: Presentation[] = $props();

    function truncateString(str: string, maxLength: number = 40): string {
        return str.length > maxLength ? str.slice(0, maxLength) + "..." : str;
    }

    let scrollPos = 0;
    const scrollStep = 400;

    const scroll = (direction: 'left' | 'right') => {
        const container = document.querySelector('.scroll-container');
        if (!container) return;

        const maxScroll = container.scrollWidth - container.clientWidth;
        scrollPos = Math.max(
            0,
            Math.min(maxScroll, scrollPos + (direction === 'left' ? -scrollStep : scrollStep))
        );
        container.scrollTo({ left: scrollPos, behavior: 'smooth' });
    };
</script>

<div class="lections-block">
    <h2 class="title">[ Lections ]</h2>

    {#if lections.length === 0}
        <div class="empty-state">
            <enhanced:img
                src="/src/images/UFONotFound.png"
                width="80px"
                height="80px"
                alt="No lections"
            />
            <div>Lections not found</div>
        </div>
    {:else}
        <div class="container">
            <button
                aria-label="left-button"
                class="nav-btn nav-btn--left"
                onclick={() => scroll('left')}
            >
                <svg viewBox="0 0 24 24" width="24" height="24">
                    <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z" />
                </svg>
            </button>

            <div class="scroll-container">
                {#each lections as { id, presentationName }}
                    <a href="/lectures/{id}" class="card" rel="noopener">
                        <div class="thumb">
                            <span>📚</span>
                        </div>
                        <span class="name">{truncateString(presentationName, 20)}</span>
                        <div class="hover-effect"></div>
                    </a>
                {/each}
            </div>
            <button
                aria-label="right button"
                class="nav-btn nav-btn--right"
                onclick={() => scroll('right')}
            >
                <svg viewBox="0 0 24 24" width="24" height="24">
                    <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
                </svg>
            </button>
        </div>
    {/if}
</div>

<style>
    .lections-block {
        display: flex;
        flex-direction: column;
        padding: 10px;
    }

    .title {
        margin: 5px 0 15px 10px;
        font-size: 1.5rem;
        font-weight: 600;
        color: #ffebe0;
    }

    .container {
        display: flex;
        align-items: center;
        position: relative;
    }

    .scroll-container {
        display: flex;
        overflow-x: auto;
        scroll-behavior: smooth;
        gap: 15px;
        padding: 10px 0;
        scrollbar-width: none;
        -ms-overflow-style: none;
        width: 100%;
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
        place-items: center;
        cursor: pointer;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        opacity: 0;
        transition: opacity 0.3s ease;
        z-index: 10;
    }

    .container:hover .nav-btn {
        opacity: 0.8;
    }

    .nav-btn:hover {
        background: #f5f5f5;
        opacity: 1 !important;
    }

    .nav-btn--left {
        left: 10px;
    }

    .nav-btn--right {
        right: 10px;
    }

    .card {
        position: relative;
        width: 170px;
        height: 200px;
        display: flex;
        flex-direction: column;
        flex-shrink: 0;
        background: white;
        border-radius: 12px;
        overflow: hidden;
        background: rgba(51, 69, 161, 0.2);
        border: 1px solid #3b3b8a;
        color: white;
        transition: transform 0.2s ease;
    }

    .card:hover {
        transform: translateY(-5px);
        box-shadow:
            0 10px 15px -3px rgba(0, 0, 0, 0.1),
            0 4px 6px -2px rgba(0, 0, 0, 0.05);
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
