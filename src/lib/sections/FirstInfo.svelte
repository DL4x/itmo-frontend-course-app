<script lang="ts">
    import { Blockquote } from 'flowbite-svelte';

	const { name }: { name: string } = $props();
    let min = 1;
    let max = 5;
</script>

<section id="about_me_section">
    <div class="container">
        <img
            alt="Abstract beautiful geometric shapes"
            class="image"
            src={`/src/images/profileImages/${Math.floor(Math.random() * (max - min)) + min}.png`}
            width="400px"
        />
        <div class="info">
            <h1 class="text">
                {name}
            </h1>
            <!-- <ul>
                <li>Age: 13 years</li>
                <li>Location: Russia, Moscow</li>
                <li>Gender: Male</li>
                <li>Education: ITMO University</li>
            </ul>
            <Blockquote alignment="center" class="w-110">"Flowbite is just awesome. It contains tons of predesigned components and 
                pages starting from login screen to complex dashboard. Perfect choice for your next 
                SaaS application."</Blockquote> -->
        </div>
    </div>
</section>

<style>
    .info {
        text-align: center;
        display: flex;
        flex-direction: column;
        gap: 32px;
    }

    section {
        margin-top: 80px;
        display: flex;
        margin-block: 0;
    }

    .container {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10%;
        align-self: center;
    }
</style>
