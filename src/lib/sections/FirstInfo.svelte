<script lang="ts">
	const { name }: { name: string } = $props();
</script>

<section id="about_me_section">
    <div class="container">
        <enhanced:img
            alt="Abstract beautiful geometric shapes"
            class="image"
            src="/src/images/profileImages/1.png"
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
