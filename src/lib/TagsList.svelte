<script lang="ts">
    import {GradientButton, Rating} from "flowbite-svelte";

    interface Props {
        tags: Iterable<string>;
        activeTags?: Set<string>;
        onTagClick?: (tag: string) => void;
        rating?: number;
    }

    const {tags, activeTags, onTagClick = it => {}, rating}: Props = $props();

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

    function getTagColor(i: number): ButtonColor {
        const styles: ButtonColor[] = ["purpleToBlue", "cyanToBlue", "greenToBlue", "purpleToPink", "pinkToOrange", "tealToLime", "redToYellow", "green", "red", "blue", "purple", "pink", "teal", "cyan", "lime"];
        return styles[i % styles.length];
    }
    function onClick(tag: string, event?: MouseEvent) {
        event?.stopPropagation();
        onTagClick(tag);
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
    {#each tags as tag, i (tag)}
        <GradientButton
                size="xs"
                pill
                outline={activeTags === undefined ? true : !activeTags.has(tag)}
                color={getTagColor(i)}
                on:click={event => onClick(tag, event)}
        ><span class="tag-text">{tag}</span></GradientButton>
    {/each}
    {#if rating !== undefined}
        <Rating class="ml-auto" total={5} rating={rating}/>
    {/if}
</div>
