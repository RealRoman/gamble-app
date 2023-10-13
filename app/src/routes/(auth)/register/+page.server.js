import { fail, redirect } from '@sveltejs/kit';

/** @type {import('./$types').Actions} */
export const actions = {
    register: async (event) =>{
        const {request, cookies, fetch} = event
        const formData = await request.formData()
        const url = 'http://127.0.0.1:8000/register';
        const headers = {
            'accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
          };
        const data = new URLSearchParams();
        data.append('grant_type', '');
        data.append('username', formData.get('email'));
        data.append('password', formData.get('password'));
        data.append('scope', '');
        data.append('client_id', '');
        data.append('client_secret', '');

        const response = await fetch(url, {
            method: 'POST',
            headers,
            body: data
        })
        switch (response.status) {
            case 200:
                const user = await response.json()
                cookies.set('token', user.access_token)
                throw redirect(303, '/')
        
            default:
                const error = await response.json()
                return fail(response.status, {
                    error: error.detail
                })
        }
        
    }
};