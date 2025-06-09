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
    import {page} from '$app/state';
    import {userStore} from '$lib/store';

    function signOut() {
        userStore.set(null);
    }
</script>

<Navbar class="sticky bg-my-gray flex items-center">
    <NavBrand href="/">
        <enhanced:img alt="Main logo" src="/src/images/planet.png" width="50"/>
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
        <NavHamburger/>
    </div>

    <Dropdown placement="bottom" triggeredBy="#user-menu">
        <DropdownItem on:click={signOut}>Выйти</DropdownItem>
    </Dropdown>

    <NavUl
            activeUrl={page.url.pathname}
            class="order-1 ml-auto"
            nonActiveClass="not-md:hover:bg-primary-700/35"
            ulClass="md:flex md:items-center md:gap-8 not-md:mt-4 bg-my-gray border-0"
    >
        <NavLi class="mx-4 font-bold tracking-widest uppercase text-primary-50" href="/">
            Главная
        </NavLi>
        <NavLi class="mx-4 font-bold tracking-widest uppercase text-primary-50" href="/resumes">
            О нас
        </NavLi>
        <NavLi class="mx-4 font-bold tracking-widest uppercase text-primary-50" href="/help">
            Поддержка
        </NavLi>
    </NavUl>
</Navbar>

<slot/>
