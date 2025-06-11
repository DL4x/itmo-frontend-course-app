<script lang="ts">
    import {Avatar} from 'flowbite-svelte';

    interface Props {
        id: string;
        name: string;
    }

    const {id, name}: Props = $props();

    function getInitials(str: string): string {
        if (str.length == 2) return str.toUpperCase();

        const words = str.split(/\s+/);
        switch (words.length) {
            case 0:
                return '';
            case 1:
                return `${words[0][0].toUpperCase()}`;
            default:
                return `${words[0][0].toUpperCase()} ${words[1][0].toUpperCase()}`;
        }
    }
</script>

<a class="chip bg-gray flex flex-row gap-2 items-center" href="/resumes/{id}">
    <Avatar class="bg-primary-400 group-hover:bg-primary-400 transition-colors" size="md">
        {getInitials(name)}
    </Avatar>
    <div class="font-medium dark:text-white flex flex-col">
        <h6 class="text-sm">{name}</h6>
    </div>
</a>

<style>
    .chip {
        padding: 2px 4px !important;
    }
</style>
