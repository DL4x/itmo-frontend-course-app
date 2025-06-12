<script lang="ts">
    import {
        Button,
        P,
        Dropdown,
        DropdownItem,
        Navbar,
        NavBrand,
        NavHamburger,
        NavLi,
        NavUl
    } from 'flowbite-svelte';
    import { page } from '$app/state';
    import { userStore } from '$lib/store';

    function signOut() {
        userStore.set(null);
    }
</script>

<Navbar class="sticky bg-my-gray flex items-center">
    <NavBrand href="/">
        <img width="180" src="/logo/main-logo.svg" alt="Main logo" />
    </NavBrand>

    <div class="flex items-center md:order-2 ml-auto">
        {#if $userStore}
            <P id="user-menu" class="font-bold tracking-widest uppercase text-primary-50">
                {$userStore.name}
            </P>
        {:else}
            <Button href="/auth" class="font-bold tracking-widest uppercase bg-primary-700">
                Войти
            </Button>
        {/if}
        <NavHamburger />
    </div>

    <Dropdown placement="bottom" triggeredBy="#user-menu">
        <DropdownItem on:click={signOut}>Выйти</DropdownItem>
    </Dropdown>

    <NavUl
        activeUrl={page.url.pathname}
        class="order-1 ml-auto"
        ulClass="md:flex md:items-center md:gap-8 not-md:mt-4 bg-my-gray border-0"
        nonActiveClass="not-md:hover:bg-primary-700/35"
    >
        <NavLi href="/" class="mx-4 font-bold tracking-widest uppercase text-primary-50">
            Главная
        </NavLi>
        <NavLi href="/resumes" class="mx-4 font-bold tracking-widest uppercase text-primary-50">
            О нас
        </NavLi>
        <NavLi href="/help" class="mx-4 font-bold tracking-widest uppercase text-primary-50">
            Поддержка
        </NavLi>
    </NavUl>
</Navbar>

<slot />
