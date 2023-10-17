<script>
    import { onMount, onDestroy } from 'svelte';
    import Pexeso from './pexeso.svelte';

    export let data
    const { user, token } = data
    const fetchToken = `Bearer ${token}`;
    let bet
    let sumBet
    let errorMessage = 'Enter your first bet'
    let pole = []
    let tileMap = []

    const delay = ms => new Promise(res => setTimeout(res, ms));

    const handleGuess = async (x_pos, y_pos) =>{
        if (sumBet <= 0) {
            errorMessage = 'Enter your bet'
            return
        }
        if (bet > user.balance) {
            return
        }
        console.log(sumBet)
        tileMap[y_pos * pole.length + x_pos].turned = true
        const data = {
            x_pos,
            y_pos,
            bet: sumBet
        }
        const request = await fetch('http://127.0.0.1:8000/pexeso/guess/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': fetchToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        const response = await request.json()
        // Pokud je true->uzivatel prohral
        user.balance -= bet
        bet = 0
        tileMap[y_pos * pole.length + x_pos].guess = response
        if (response) {
            sumBet = 0
            bet = 0
            await delay(2500)
            naplnPole()
        }
    }

    const handleEnd = async () =>{
        const request = await fetch('http://127.0.0.1:8000/pexeso/end_game/', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': fetchToken,
            }
        })
        const response = await request.json()
        user.balance = response.balance
        naplnPole()

    }

    const naplnPole = () =>{
        sumBet = 0
        bet = 0
        for (let i = 0; i < 5; i++) {
            pole[i] = i;
            
        }
        for (let i = 0; i < pole.length; i++) {
            for (let j = 0; j < pole.length; j++) {
                tileMap[j * pole.length + i] = {
                    guess: null,
                    turned: false
                }
            
        }
            
        }
    }

    const handleBet = () =>{
        if (bet < 0) {
            return
        }
        user.balance -= bet
        sumBet += bet
    }

    onMount(async () => {
        console.log('connect')
        
        const request = await fetch('http://127.0.0.1:8000/pexeso/connect/', {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'Authorization': fetchToken,
            }
        })
        const response = await request.json()
        naplnPole()
        
	});

    onDestroy(async () =>{
        console.log('disconnect')
        const request = await fetch('http://127.0.0.1:8000/pexeso/disconnect/', {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'Authorization': fetchToken,
            }
        })
        const response = await request.json()
        // Pokud je true->uzivatel prohral
        console.log(response)
    })
</script>

<div class="flex flex-col">
    
    <div class="flex justify-center flex-col">
        <div class="relative flex justify-center">
            <div class="absolute text-slate-300 top-1/2 text-3xl">
                {#if sumBet <= 0}
                    {errorMessage}
                {/if}
            </div>
            <div class="flex flex-col" class:blur-sm={sumBet <= 0}>
                {#each pole as i}
                    <div class="flex flex-row">
                        {#each pole as j}
                            <Pexeso turned={tileMap[i * pole.length + j].turned} guess={tileMap[i * pole.length + j].guess} number={i * pole.length + j} play={sumBet > 0} on:click={() => handleGuess(j, i)}></Pexeso>
                        {/each}
                    </div>
                {/each}
            </div>
        </div>
        <div>
           
        </div>
        <div class="text-slate-300 flex justify-center my-10">
            <div class="flex flex-col me-10 text-center">
                <p>Balance:</p>
                <p class="text-2xl">{user.balance}</p>        
            </div>
            <button class="me-1 rounded-s-full py-3 px-6 bg-inherit border-l-2 border-b-2 border-t-2 focus:border-2 hover:border-teal-400" on:click={handleEnd}>End!</button>
            <input class="text-center py-3 px-6 bg-inherit border-b-2 border-t-2 border-green-400 focus:outline-none focus:border-2 focus:border-teal-400" min="0" type="number" name="bet" id="bet" bind:value={bet}>
            <button class="ms-1 rounded-e-full py-3 px-6 bg-inherit border-r-2 border-b-2 border-t-2 focus:border-2 hover:border-teal-400" on:click={handleBet}>Bet!</button>
            <div class="flex flex-col ms-10 text-center">
                <p>Total bet:</p>
                <p class="text-2xl">{sumBet}</p>
            </div>
        </div>
    </div>
</div>