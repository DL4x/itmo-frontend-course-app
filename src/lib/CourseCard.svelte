<script lang="ts">
    export let course: {
        id: number;
        title: string;
        description: string;
        image: string;
    };

    // Цвета из задания
    const colors = {
        background: '#F2E9E4',
        titleBg: '#9A8C98',
        descriptionBg: '#C9ADA7',
        button: '#FE8A70',
        buttonHover: '#E07A60'
    };

    function handleMouseEnter(e: MouseEvent) {
        const target = e.target as HTMLButtonElement;
        if (target) {
            target.style.backgroundColor = colors.buttonHover;
        }
    }

    function handleMouseLeave(e: MouseEvent) {
        const target = e.target as HTMLButtonElement;
        if (target) {
            target.style.backgroundColor = colors.button;
        }
    }
</script>

<div class="course-card" style="background-color: {colors.background}">
    <div class="image-container">
        <img src={course.image} alt={course.title} />
    </div>

    <div class="title" style="background-color: {colors.titleBg}">
        {course.title}
    </div>

    <div class="description" style="background-color: {colors.descriptionBg}">
        {course.description}
    </div>

    <button
        style="background-color: {colors.button}"
        on:mouseenter={handleMouseEnter}
        on:mouseleave={handleMouseLeave}
    >
        Перейти к курсу
    </button>
</div>

<style>
    .course-card {
        width: 300px;
        border-radius: 10px;
        overflow: hidden;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        margin: 20px;
        display: flex;
        flex-direction: column;
    }

    .image-container {
        width: 100%;
        height: 160px;
        overflow: hidden;
    }

    .image-container img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .title {
        padding: 15px;
        color: white;
        font-size: 1.2rem;
        font-weight: bold;
        text-align: center;
    }

    .description {
        padding: 15px;
        color: #333;
        font-size: 0.9rem;
        flex-grow: 1;
    }

    button {
        border: none;
        padding: 12px;
        color: white;
        font-weight: bold;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }
</style>
