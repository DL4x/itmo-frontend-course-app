<script lang="ts">
    import type { Education } from '$lib';

    const education: Education[] = $props();

    let scrollPos = 0;
    const scrollStep = 510;

    const scroll = (direction: 'left' | 'right') => {
        const container = document.querySelector('.education-scroll-container');
        if (!container) return;

        const maxScroll = container.scrollWidth - container.clientWidth;
        scrollPos = Math.max(
            0,
            Math.min(maxScroll, scrollPos + (direction === 'left' ? -scrollStep : scrollStep))
        );
        container.scrollTo({ left: scrollPos, behavior: 'smooth' });
    };
</script>

<div class="education-block">
    <div class="title">[ Education ]</div>

    {#if education.length === 0}
        <div class="empty-state">
            <enhanced:img
                src="/static/images/UFONotFound.png"
                width="80px"
                height="80px"
                alt="No education"
            />
            <div>Education not found</div>
        </div>
    {:else}
        <div class="timeline">
            <div class="line"></div>
            <button aria-label="left button" class="nav-btn nav-btn--left" onclick={() => scroll('left')}>
                <svg viewBox="0 0 24 24" width="24" height="24">
                    <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z" />
                </svg>
            </button>

            <div class="education-scroll-container">
                {#each education as { title, subtitle, timeRange }, i}
                    <div
                        class="item"
                        class:first-marker={i === 0}
                        class:last-marker={i === education.length - 1}
                    >
                        <div class="marker"></div>
                        <div class="period">{timeRange.start} - {timeRange.end}</div>
                        <div class="content">
                            <div class="institution">{title}</div>
                            <p class="degree">{subtitle}</p>
                        </div>
                    </div>
                {/each}
            </div>

            <button aria-label="right button" class="nav-btn nav-btn--right" onclick={() => scroll('right')}>
                <svg viewBox="0 0 24 24" width="24" height="24">
                    <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
                </svg>
            </button>
        </div>
    {/if}
</div>

<style>
    .education-block {
        display: flex;
        flex-direction: column;
        padding: 10px;
    }

    .title {
        margin: 5px 0 15px 10px;
        color: #ffebe0;
        font-size: 1.5rem;
        font-weight: 600;
    }

    .timeline {
        position: relative;
        display: flex;
        align-items: center;
    }

    .line {
        position: absolute;
        left: 0;
        right: 0;
        top: 12px;
        height: 2px;
        background: #e2e8f0;
        z-index: 1;
    }

    .education-scroll-container {
        display: flex;
        overflow-x: auto;
        scroll-behavior: smooth;
        gap: 15px;
        padding: 20px 0;
        scrollbar-width: none;
        width: 100%;
    }

    .education-scroll-container::-webkit-scrollbar {
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
        flex-shrink: 0;
    }

    .timeline:hover .nav-btn {
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

    .item {
        position: relative;
        display: flex;
        flex-direction: column;
        min-width: 240px;
        padding: 0 20px;
        z-index: 2;
        margin-top: -15px;
    }

    .marker {
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: #4f46e5;
        border: 3px solid white;
        box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.3);
        margin-bottom: 20px;
    }

    .period {
        color: white;
        font-weight: 600;
        margin: -15px 0 0.5rem;
    }

    .content {
        display: flex;
        flex-direction: column;
    }

    .institution {
        font-weight: bold;
        font-size: 1.2rem;
        color: #e6d8c8;
        line-height: 1.5rem;
    }

    .degree {
        color: #a8a29e;
        line-height: 1.1rem;
    }

    .empty-state {
        display: grid;
        place-items: center;
        gap: 10px;
        color: #777;
    }

    @media (max-width: 768px) {
        .item {
            min-width: 160px;
            padding: 0 10px;
        }
    }

    @media (max-width: 480px) {
        .item {
            min-width: 140px;
        }
    }
</style>
