

export const authenticateUser = async (event) =>{
    const { cookies, fetch} = event
    const token = cookies.get('token')
    if (token === undefined) {
        // uzivatel neni prihlasen
        return null
    }
    const url = 'http://127.0.0.1:8000/users/me/';

    const headers = {
    'accept': 'application/json',
    'Authorization': `Bearer ${token}`
    };

    const response = await fetch(url, {
        method: 'GET',
        headers
    })
    switch (response.status) {
        case 200:
            return await response.json()
        default:
            // uzivatel ma token ale jiz je neplatny
            return null    
        
    }
}   
