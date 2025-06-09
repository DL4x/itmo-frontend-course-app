<script lang="ts">
    interface LectionItem {
        title: string;
        url: string;
    }

    // Пример данных лекций
    const lections: LectionItem[] = [
        {title: 'Введение в Svelte', url: '#'},
        {title: 'Основы TypeScript', url: '#'},
        {title: 'CSS Grid Layout', url: '#'},
        {title: 'Анимации в Web', url: '#'},
        {title: 'Оптимизация производительности', url: '#'},
        {title: 'Работа с API', url: '#'},
        {title: 'Тестирование компонентов', url: '#'},
        {title: 'State Management', url: '#'},
        {title: 'Web Components', url: '#'}
    ];

    let activeModalLections = false;
    let scrollPosition = 0;
    const scrollStep = 200;

    function scrollLeft() {
        const container = document.querySelector('.lections-scroll-container');
        if (container) {
            scrollPosition = Math.max(0, scrollPosition - scrollStep);
            container.scrollTo({left: scrollPosition, behavior: 'smooth'});
        }
    }

    function scrollRight() {
        const container = document.querySelector('.lections-scroll-container');
        if (container) {
            const maxScroll = container.scrollWidth - container.clientWidth;
            scrollPosition = Math.min(maxScroll, scrollPosition + scrollStep);
            container.scrollTo({left: scrollPosition, behavior: 'smooth'});
        }
    }

    function openModalLections() {
        activeModalLections = true;
    }

    function closeModalLections() {
        activeModalLections = false;
    }

    import {fade, fly} from 'svelte/transition';
    import {quintOut} from 'svelte/easing';
</script>

<div class="block">
    <div class="title">Favourite</div>
    {#if lections.length > 0}
        <div class="lections-container">
            <button class="scroll-button left" on:click={scrollLeft} aria-label="Scroll left">
                &lt;
            </button>

            <div class="lections-scroll-container">
                {#each lections.slice(0, 6) as lection}
                    <!-- Показываем первые 6 в скролле -->
                    <a href={lection.url} class="lection-card" target="_blank" rel="noopener">
                        <div class="lection-placeholder">
                            <div class="lection-icon">❤️</div>
                        </div>
                        <span class="lection-title">{lection.title}</span>
                        <div class="lection-hover-effect"></div>
                    </a>
                {/each}
            </div>

            <button class="scroll-button right" on:click={scrollRight} aria-label="Scroll right">
                &gt;
            </button>
        </div>
    {:else}
        <div class="no-lections">
            <img src="https://via.placeholder.com/100" alt="No lections" class="no-lections-img"/>
            <div class="no-lections-text">Lections not found</div>
        </div>
    {/if}
    <div class="button-container">
        <button class="read-more-btn" on:click={openModalLections}> Read more</button>
    </div>
</div>

{#if activeModalLections}
    <div class="modal-backdrop" transition:fade={{ duration: 300 }} on:click|self={closeModalLections}>
        <div class="modal-window" transition:fly={{ y: 100, duration: 300, easing: quintOut }}>
            <div class="modal-title">All Favourite</div>
            <div class="modal-lections-grid">
                {#each lections as lection}
                    <a href={lection.url} class="lection-card" target="_blank" rel="noopener">
                        <div class="lection-placeholder">
                            <div class="lection-icon">❤️</div>
                        </div>
                        <span class="lection-title">{lection.title}</span>
                        <div class="lection-hover-effect"></div>
                    </a>
                {/each}
            </div>
            <div class="modal-button-container">
                <button class="close-btn" on:click={closeModalLections}> Close</button>
            </div>
        </div>
    </div>
{/if}

<style>
    .block {
        position: relative;
        box-sizing: border-box;
        min-width: 0;
        display: flex;
        flex-direction: column;

        flex: 1;
    }

    .title,
    .modal-title {
        text-align: center;
        margin-bottom: 15px;
        color: #333;

        font-size: 1.5rem;
        font-weight: 600;
    }

    .button-container {
        position: relative;
        height: 30px;
    }

    .read-more-btn {
        position: absolute;
        right: 0;
        bottom: 0;
        padding: 5px 10px;
        background: #4caf50;
        color: white;
        border: none;
        border-radius: 3px;
        cursor: pointer;
        font-size: 12px;
    }

    .read-more-btn:hover {
        background: #45a049;
    }

    .modal-backdrop {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;

        animation: fadeIn 0.3s forwards;
    }

    @keyframes fadeIn {
        to {
            background: rgba(0, 0, 0, 0.5);
        }
    }

    .modal-window {
        background: white;
        padding: 20px;
        border-radius: 8px;
        width: 60%;
        max-width: 500px;
        position: relative;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
        display: flex;
        flex-direction: column;
        min-height: 300px;
        max-height: 600px;

        gap: 15px;
    }

    .modal-content {
        overflow: auto;
        flex: 1;
        white-space: pre-line; /* Сохраняет переносы строк */
        overflow-wrap: break-word;
    }

    .modal-button-container {
        display: flex;
        justify-content: flex-end;
    }

    .close-btn {
        padding: 8px 16px;
        background: #f44336;
        color: white;
        border: none;
        border-radius: 3px;
        cursor: pointer;
        font-size: 14px;

        transition: transform 0.2s, background-color 0.2s;
    }

    .close-btn:hover {
        background: #d32f2f;

        transform: scale(1.05);
    }

    .page.dimmed {
        filter: brightness(0.7);
        pointer-events: none;
        user-select: none;
    }


    .lections-container {
        display: flex;
        align-items: center;
        position: relative;
    }

    .lections-scroll-container {
        display: flex;
        overflow-x: auto;
        scroll-behavior: smooth;
        gap: 15px;
        padding: 10px 0;
        scrollbar-width: none; /* Firefox */
        -ms-overflow-style: none; /* IE/Edge */
    }

    .lections-scroll-container::-webkit-scrollbar {
        display: none; /* Chrome/Safari */
    }

    /* .lection-card {
        flex: 0 0 auto;
        width: 150px;
        height: 180px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        border: 2px dashed #4caf50;
        border-radius: 8px;
        padding: 15px;
        text-decoration: none;
        color: #333;
        transition: transform 0.2s;
    }

    .lection-card:hover {
        transform: translateY(-5px);
        border-color: #45a049;
    }

    .lection-placeholder {
        width: 120px;
        height: 120px;
        border: 1px solid #ccc;
        border-radius: 4px;
        background-color: #f8f8f8;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #999;
    }

    .lection-title {
        text-align: center;
        font-size: 0.9rem;
        word-break: break-word;
    } */

    .lection-card {
        flex: 0 0 auto;

        position: relative;
        width: 160px;
        height: 200px;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-decoration: none;
        color: #2d3748;
        border-radius: 12px;
        overflow: hidden;
        background: white;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
        0 2px 4px -1px rgba(0, 0, 0, 0.06);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        border: 1px solid #e2e8f0;
        z-index: 1;
    }

    .lection-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
        0 4px 6px -2px rgba(0, 0, 0, 0.05);
    }

    .lection-placeholder {
        width: 100%;
        height: 120px;
        background: linear-gradient(135deg, #f5f7fa 0%, #e2c3c8 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        border-bottom: 1px solid #e2e8f0;
    }

    .lection-icon {
        font-size: 3rem;
        opacity: 0.8;
    }

    .lection-title {
        padding: 16px;
        text-align: center;
        font-size: 0.95rem;
        font-weight: 500;
        line-height: 1.4;
        flex-grow: 1;
        display: flex;
        align-items: center;
    }

    .lection-hover-effect {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 4px;
        background: linear-gradient(90deg, #e5465e, #7b10b9);
        transform: scaleX(0);
        transform-origin: left;
        transition: transform 0.3s ease;
        z-index: 2;
    }

    .lection-card:hover .lection-hover-effect {
        transform: scaleX(1);
    }

    /* Адаптивность */
    @media (max-width: 768px) {
        .lection-card {
            width: 160px;
            height: 200px;
        }

        .lection-placeholder {
            height: 100px;
        }
    }

    @media (max-width: 480px) {
        .lection-card {
            width: 140px;
            height: 180px;
        }

        .lection-icon {
            font-size: 2.5rem;
        }
    }

    .scroll-button {
        background: white;
        border: 1px solid #ddd;
        border-radius: 50%;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        z-index: 1;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        flex-shrink: 0;
    }

    .scroll-button:hover {
        background: #f5f5f5;
    }

    .scroll-button.left {
        margin-right: 10px;
    }

    .scroll-button.right {
        margin-left: 10px;
    }

    .no-lections {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 10px;
        color: #777;
    }

    .no-lections-img {
        width: 80px;
        opacity: 0.5;
    }

    .no-lections-text {
        font-size: 0.9rem;
    }

    /* @media (max-width: 768px) {
        .lection-card {
            width: 120px;
            height: 150px;
        }

        .lection-placeholder {
            width: 90px;
            height: 90px;
        }
    } */

    .modal-lections-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 20px;
        padding: 10px;
        max-height: 60vh;
        overflow-y: auto;
    }

    @media (max-width: 768px) {
        .modal-lections-grid {
            grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
            gap: 15px;
        }
    }

    @media (max-width: 480px) {
        .modal-lections-grid {
            grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
            gap: 10px;
        }
    }
</style>
