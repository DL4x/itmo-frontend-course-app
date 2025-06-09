<script lang="ts">
    type Education = {
        institution: string;
        degree: string;
        period: string;
    };

    const education: Education[] = [
        { institution: 'Samara Lyceum', degree: 'Certificate of secondary general education', period: '2018 - 2022' },
        { institution: 'Stanford University', degree: 'Bachelor of Computer Science', period: '2022 - 2026' },
        { institution: 'MIT', degree: 'Master of Artificial Intelligence', period: '2026 - 2028' },
        { institution: 'Samara Lyceum', degree: 'Certificate of secondary general education', period: '2018 - 2022' },
        { institution: 'MIT', degree: 'Master of Artificial Intelligence', period: '2026 - 2028' },
        { institution: 'MIT', degree: 'Master of Artificial Intelligence', period: '2026 - 2028' },
        { institution: 'MIT', degree: 'Master of Artificial Intelligence', period: '2026 - 2028' }
    ];

    let scrollPos = 0;
    const scrollStep = 510;

    const scroll = (direction: 'left' | 'right') => {
        const container = document.querySelector('.education-scroll-container');
        if (!container) return;

        const maxScroll = container.scrollWidth - container.clientWidth;
        scrollPos = Math.max(0, Math.min(maxScroll, scrollPos + (direction === 'left' ? -scrollStep : scrollStep)));
        container.scrollTo({ left: scrollPos, behavior: 'smooth' });
    };
</script>

<div class="education-block">
    <div class="title">[ Education ]</div>
    
    {#if education.length === 0}
        <div class="empty-state">
            <img src="https://via.placeholder.com/100" alt="No education" />
            <div>Education not found</div>
        </div>
    {:else}
        <div class="timeline">
            <div class="line"></div>
            <button class="nav-btn left" on:click={() => scroll('left')} aria-label="Scroll left">&lt;</button>
            
            <div class="education-scroll-container">
                {#each education as { institution, degree, period }}
                    <div class="item">
                        <div class="marker"></div>
                        <div class="period">{period}</div>
                        <div class="content">
                            <div class="institution">{institution}</div>
                            <p class="degree">{degree}</p>
                        </div>
                    </div>
                {/each}
            </div>
            
            <button class="nav-btn right" on:click={() => scroll('right')} aria-label="Scroll right">&gt;</button>
        </div>
    {/if}
</div>

<style>
    .education-block {
        display: flex;
        flex-direction: column;
    }

    .title {
        margin: 5px 0 15px 10px;
        color: #333;
        font-size: 1.5rem;
        font-weight: 600;
    }

    .timeline {
        position: relative;
        display: flex;
    }

    .line {
        position: absolute;
        inset: 10px 0 auto 0;
        height: 4px;
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
        flex-shrink: 0;
        cursor: pointer;
        z-index: 1;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        align-self: center;
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
        color: #4f46e5;
        font-weight: 600;
        margin: -15px 0 0.5rem;
    }

    .content {
        display: flex;
        flex-direction: column;
    }

    .institution {
        font-weight: bold;
        font-size: 1.5rem;
        color: #1a202c;
        line-height: 1.5rem;
    }

    .degree {
        color: #4a5568;
        line-height: 1.1rem;
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