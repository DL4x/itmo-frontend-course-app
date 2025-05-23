<script lang="ts">
    import { Button, Navbar, NavBrand, NavHamburger, NavLi, NavUl } from 'flowbite-svelte';
    import '/src/app.css';
    import { page } from '$app/state';
    import VerticalLine from '$lib/VerticalLine.svelte';
    import { userStore } from '../store';

    let { children } = $props();
</script>

<Navbar
    class="sticky top-0 z-1000 bg-[#4A4E69] shadow-sm min-h-[5vh] flex items-center"
    navContainerClass="gap-8"
>
    <NavBrand href="/">
        <enhanced:img src="/src/images/ufo-flying.png" alt="Main logo" />
    </NavBrand>
    <VerticalLine lineHeight="40px" class="not-md:hidden" />

	<NavUl activeUrl={page.url.pathname}>
		<NavLi href="/" class="text-[#FFEBE0]">Главная</NavLi>
		<NavLi href="/resumes" class="text-[#FFEBE0]" activeClass="">О нас</NavLi>
		<NavLi href="/" class="text-[#FFEBE0]" activeClass="">Поддержка</NavLi>
	</NavUl>
    <NavBrand class="flex flex-row gap-4 md:ml-auto md:order-last">
        <NavHamburger />
        {#if $userStore}
            <p style="color: #ffebe0">{$userStore.name}</p>
        {:else}
            <Button href="/auth" class="bg-[#FE8A70]">Войти</Button>
        {/if}
    </NavBrand>
</Navbar>
{@render children()}
