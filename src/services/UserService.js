import Api from './Api'

export default {
    getUsers() {
        return Api.get('/users')
    },
    joinShop(userId, payload) {
        return Api.post(`/user/${userId}/operators`, payload)
    },
    getUserOperators(userId) {
        return Api.get(`/user/${userId}/operators`)
    }
}
