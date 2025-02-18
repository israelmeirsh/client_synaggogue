const BASE_URL = 'http://127.0.0.1:3000/api/users';


export async function registerUser(user) {

        const response = await fetch(BASE_URL+'/register', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const obj = await response.json();
        if(obj.error){
            throw new Error(obj.error);
        }
    return obj.data;
}
export async function login(user) {
    const response = await fetch(BASE_URL+'/login', {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const obj = await response.json();
    if(obj.error){
        throw new Error(obj.error);
    }
    return obj.data;
}
export async function logout() {
    const response = await fetch(BASE_URL+'/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const obj = await response.json();
    if(obj.error){
        throw new Error(obj.error);
    }
    return obj.data;
}   