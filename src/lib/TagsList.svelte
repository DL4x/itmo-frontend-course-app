<script lang="ts">
    import {GradientButton} from "flowbite-svelte";

    interface Props {
        tags: string[];
    }

    const {tags}: Props = $props();

    /*function getTagClasses(tag: string): string {
        const styles = [
            'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
            'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
            'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200',
            'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200',
            'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200',
            'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200',
            'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200'
        ];
        const hash = tag.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        return styles[hash % styles.length];
    }*/
    type ButtonColor =
        "green"
        | "red"
        | "blue"
        | "purple"
        | "pink"
        | "teal"
        | "cyan"
        | "lime"
        | "purpleToBlue"
        | "cyanToBlue"
        | "greenToBlue"
        | "purpleToPink"
        | "pinkToOrange"
        | "tealToLime"
        | "redToYellow"

    function getTagColor(tag: string): ButtonColor {
        const styles: ButtonColor[] = ["green", "red", "blue", "purple", "pink", "teal", "cyan", "lime", "purpleToBlue", "cyanToBlue", "greenToBlue", "purpleToPink", "pinkToOrange", "tealToLime", "redToYellow"];
        return styles[hashCode(tag) % styles.length];
    }

    function hashCode(str: string): number {
        if (str.length === 0) return 0;
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            let chr = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + chr;
            hash |= 0; // Convert to 32bit integer
        }
        return hash;
    }
</script>

<style>
    :global {
        .my-tags-list > div > button {
            background-color: var(--color-my-card-background);
        }

        .my-tags-list > div > button:hover {
            background-color: transparent;
        }

        .my-tags-list > div > button > .tag-text {
            color: var(--color-primary-100);
        }
    }
</style>

<div class="my-tags-list flex flex-wrap gap-2">
    {#each tags as tag (tag)}
        <GradientButton outline size="xs" color={getTagColor(tag)} pill>
            <span class="tag-text">{tag}</span>
        </GradientButton>
        <!--        <span class={`px-2 py-1 text-xs font-medium rounded ${getTagClasses(tag)}`}>{tag}</span>-->
    {/each}
</div>
