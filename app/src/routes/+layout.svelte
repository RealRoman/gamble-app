<script>
    import "../app.css";
    export let data
    const {user, token} = data

</script>
<div class="bg-slate-900 flex justify-between">
    <div></div>
    <div></div>
    <div class="flex justify-evenly">
        {#if user}
            <div class="text-slate-100 m-1 p-2 px-3 border-l-2 border-green-400 hover:text-green-400">
                <a data-sveltekit-preload-data="off" class="p-2" href="/logout">Log out</a>
            </div>
            <div class="m-1 p-2 px-3 border-l-2 border-green-400">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7 text-green-400">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            </div>
        {:else}
            <div class="text-slate-100 m-1 p-2 px-3 border-l-2 border-green-400 hover:text-green-400">
                <a class="p-2" href="/login">Log in</a>
            </div>
            <div class="text-slate-100 m-1 p-2 px-3 border-l-2 border-green-400 hover:text-green-400">
                <a class="p-2" href="/register">Sign in</a>
            </div>
            
        {/if}
    </div>
</div>
<div class="bg-slate-800 min-h-screen flex flex-col">

    
    <slot />
</div>


