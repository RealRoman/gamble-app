<script>

    export let guess
    export let turned = false
    export let number
    export let play
    console.log(play)


</script>

<button disabled={turned || !play} on:click 
    class="text-lg m-2 p-10 text-center rounded-lg border-2 border-green-400 text-slate-50" style="width: 100px;height: 100px;"
    class:border-red-400={guess} class:border-blue-400={!guess && guess != null}>
    {#if guess === null}
        {number}
    {:else}
        {#if guess === true}
            nn
        {:else}
            ok
        {/if}
    {/if}
</button>