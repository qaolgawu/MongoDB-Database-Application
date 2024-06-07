// Запросы


class Api {
    url = 'http://localhost:3000'

    response(res) {
        if (!res.ok) {
            throw new Error(`Could not fetch ${this.url}, status: ${res.status}`)
        }
        return res.json()
    }
    // вход и авторизация
    async sign(formUrl, formMethod, body) {
        return  fetch(this.url + formUrl, {
            method: formMethod,
            headers,
            body: JSON.stringify(body)
        }).then(this.response)
    }
    // аутентификация и получение данных пользователя
    async get() {
        return  fetch(this.url + '/user/me', {
            method: 'GET',
            headers: {...headers, Authorization: localStorage.getItem('token')}
        })
    }
    // обновление данных пользователя
    async update(formUrl, formMethod, body) {
        return  fetch(this.url + formUrl, {
            method: formMethod,
            headers: {...headers, Authorization: localStorage.getItem('token')},
            body: JSON.stringify(body)
        }).then(this.response)
    }
    // удаления аккаунта
    async delete() {
        return  fetch(this.url + '/user/me', {
            method: 'DELETE',
            headers: {...headers, Authorization: localStorage.getItem('token')}
        }).then(this.response)
    }
}


const headers = {
    'Content-Type': 'application/json'
}


export const api = new Api()