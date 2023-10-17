<script>
    import { onMount, onDestroy } from "svelte";
    export let data
    const { token, user} = data
    let websocket
    let userList = []
    let bet = 0
    let totalBet = 0
    let crashNumber
    let canPlay = true

    const handleBet = () =>{
        user.balance -= bet
        totalBet += bet
        bet = 0
        const message = {
            case: 'bet',
            bet: totalBet
        }
        websocket.send(JSON.stringify(message))
    }

    const handleEnd = () =>{
        // canPlay = true uzivatel nemuze hrat
        if (!canPlay){
            return
        }
        user.balance += totalBet * crashNumber
        const message = {
            case: 'crash_end'
        }
        websocket.send(JSON.stringify(message))
    }

    onMount(async () => {
        websocket = new WebSocket(`ws://127.0.0.1:8000/ws/crash/${user.username}`)

        websocket.onopen = (event) => {
            console.log('connect', event)
        };

        websocket.onmessage = async (event) => {
            const message = JSON.parse(event.data)
            switch (message.case) {
                case 'user_list':
                    userList = message.user_list
                    break;
            
                case 'crash':
                    console.log(message)
                    crashNumber = message.number
                    break; 

                case 'crash_start':
                    canPlay = true
                    break; 

                case 'crash_end':
                    canPlay = false
                    console.log(message)
                    break; 
                default:
                    console.log('neznama zprava')
                    break;
            }
        };
	});

    onDestroy(async () =>{
        console.log('destroy')
    })

    
</script>

<div>
    {#each userList as user}
        <div>
            <h1>Username: {user.username}</h1>
            <p>Balance: {user.balance}</p>
            <p>Active bet: {user.bet}</p>
        </div>
    {/each}
</div>
<div class="flex justify-center">
    <h1 class="text-slate-300 text-3xl">{crashNumber}</h1>
</div>
<div>
    <div class="text-slate-300 flex justify-center my-10">
        <div class="flex flex-col me-10 text-center">
            <p>Balance:</p>
            <p class="text-2xl">{user.balance}</p>        
        </div>
        <button class="me-1 rounded-s-full py-3 px-6 bg-inherit border-l-2 border-b-2 border-t-2 focus:border-2 hover:border-teal-400" on:click={handleEnd} disabled={!canPlay}>End!</button>
        <input class="text-center py-3 px-6 bg-inherit border-b-2 border-t-2 border-green-400 focus:outline-none focus:border-2 focus:border-teal-400" min="0" type="number" name="bet" id="bet" bind:value={bet} disabled={canPlay}>
        <button class="ms-1 rounded-e-full py-3 px-6 bg-inherit border-r-2 border-b-2 border-t-2 focus:border-2 hover:border-teal-400" on:click={handleBet} disabled={canPlay}>Bet!</button>

    </div>
</div>