<script lang="ts">
    import { Button, Navbar, NavBrand, NavLi, NavUl } from 'flowbite-svelte';
    import '/src/app.css';
    import { page } from '$app/state';
    import VerticalLine from '$lib/VerticalLine.svelte';
    import { userStore } from '$lib/store';

    let { children } = $props();
</script>

<Navbar
    class="sticky top-0 z-1000 bg-my-gray shadow-sm min-h-[5vh] flex items-center"
    navContainerClass="gap-8"
>
    <NavBrand href="/">
        <enhanced:img src="/src/images/ufo-flying.png" alt="Main logo" />
    </NavBrand>
    <VerticalLine lineHeight="40px" class="not-md:hidden" />

    <NavUl activeUrl={page.url.pathname}>
        <NavLi href="/" class="text-l mx-4 font-bold tracking-widest uppercase text-[#FFEBE0]">
            Главная
        </NavLi>
        <NavLi href="/resumes" class="text-l mx-4 font-sans font-bold tracking-widest uppercase text-[#FFEBE0] transition-all">
            О нас
        </NavLi>
        <NavLi href="/help" class="text-l mx-4 font-sans font-bold tracking-widest uppercase text-[#FFEBE0] transition-all">
            Поддержка
        </NavLi>
    </NavUl>
    <NavBrand class="flex flex-row gap-4 md:ml-auto md:order-last">
        <div>
            {#if $userStore}
                <p class="font-sans font-bold tracking-widest uppercase text-[#FFEBE0]">{$userStore.name}</p>
            {:else}
                <Button href="/auth" class="font-sans font-bold tracking-widest uppercase bg-[#FE8A70]">Войти</Button>
            {/if}
        </div>
    </NavBrand>
</Navbar>
{@render children()}
