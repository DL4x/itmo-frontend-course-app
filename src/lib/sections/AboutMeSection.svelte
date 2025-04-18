<script lang="ts">
	const { name }: { name: string } = $props();
</script>

<section id="about_me_section">
	<h1>
		Hello!<br />
		My name is {name}
	</h1>
	<enhanced:img
		alt="Abstract beautiful geometric shapes"
		class="image"
		src="/src/images/fancy_image.webp"
	/>
</section>

<style>
    h1 {
        line-height: 3.625rem;
    }

    .image {
        width: 100%;
        height: auto;
        aspect-ratio: 1140/400;
        max-width: 1140px;
        border-radius: 8px;
        overflow: hidden;
        object-fit: cover;
    }
</style>
