<script lang="typescript">
    import Loader from "../loader/index.svelte";
    export let loading: boolean = false;
    export let circle: boolean = false;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div on:click class={`button ${$$props.class}`} class:circle>
    {#if loading}
        <Loader class="button-loader" />
    {:else}
        <slot name="icon" />
    {/if}

    <slot name="text" />
</div>

<style lang="scss">
    .button {
        font-weight: 400;
        font-size: 14px;
        width: auto;
        height: auto;
        min-height: 40px;
        border-radius: 12px;
        cursor: pointer;
        padding: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto;
        border: none;
        box-shadow: rgba(60, 64, 67, 0.3) 0 1px 3px 0,
            rgba(60, 64, 67, 0.15) 0 4px 8px 3px;
        transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1),
            opacity 15ms linear 30ms,
            transform 270ms cubic-bezier(0, 0, 0.2, 1) 0ms;
        touch-action: manipulation;
        background-color: #fff;
        color: #464646;
        border: 2px solid #464646;

        outline: none;
        border: 2px solid transparent;
        &:hover {
            background: #f6f9fe;
            color: #174ea6;
        }

        &:active {
            box-shadow: 0 4px 4px 0 rgb(60 64 67 / 30%),
                0 8px 12px 6px rgb(60 64 67 / 15%);
            outline: none;
            border: 2px solid #4285f4;
        }

        &.disabled {
            background: #adafb5;
        }

        &.fullWidth {
            max-width: 100%;
        }
    }

    .circle {
        border-radius: 50%;
    }

    .hidden {
        display: none;
    }

    :global(.button-loader) {
        width: 20px;
        height: 20px;
        margin-right: 8px;
    }
</style>
