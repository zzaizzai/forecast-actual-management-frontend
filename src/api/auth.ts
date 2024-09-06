import http from './http'

export async function login(username: string, password: string) {
    return http.post('/auth/signin', {
        username,
        password
    })


}


export async function signup(username: string, password: string) {
    return http.post('/auth/signup', {
        username,
        password
    })
}

export async function checkToken() {
    return http.get('/auth/check-token')

}