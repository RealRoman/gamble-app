<script>
    import "../app.css";

    export let data
    const {user} = data


    const handleLogOut = () =>{
        document.cookie = 'token=;expires=Thu, 01 Jan 1970 00:00:01 GMT"';  
    }
</script>

<div class="flex justify-end">
    {#if user}
    <div>
        <button type="button" on:click={handleLogOut}>Log out</button>
    </div>
    {/if}
    
</div>
<slot />