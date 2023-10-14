<script>
    import { onMount, onDestroy } from 'svelte';
    export let data
    const { user, token } = data
    const fetchToken = `Bearer ${token}`;
    let bet = 0
    let sumBet = 0
    let x_pos
    let y_pos
    const handleGuess = async () =>{
        console.log('guess')
        sumBet += bet
        if (sumBet <= 0) {
            return
        }
        if (bet > user.balance) {
            return
        }
        
        const data = {
            x_pos,
            y_pos,
            bet
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
        console.log(response)
    }

    const handleEnd = async () =>{
        console.log('connect')
        const request = await fetch('http://127.0.0.1:8000/pexeso/end_game/', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': fetchToken,
            }
        })
        const response = await request.json()
        // Pokud je true->uzivatel prohral
        console.log(response)
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
        // Pokud je true->uzivatel prohral
        console.log(response)
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

<div>
    <div>
        <div>Balance: {user.balance}</div>
    </div>
    <div>
        Place bet
        <input type="number" name="bet" id="bet" bind:value={bet}>
        <div>Bet summary: {sumBet}</div>
    </div>
    <div>
        <input type="number" name="x_pos" id="x_pos" max=4 min=0 bind:value={x_pos}>
        <input type="number" name="y_pos" id="y_pos" max=4 min=0 bind:value={y_pos}>
        <button type="submit" on:click={handleGuess}>Odeslat</button>
        <button type="submit" on:click={handleEnd}>End</button>
    </div>
</div>