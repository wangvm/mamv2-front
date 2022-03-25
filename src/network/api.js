import request from "./request"

const $api = {
    login: (id, password) => request('/login', { id, password }, 'POST'),//ok
    register: (userList) => request('/user/add', { userList }, 'POST'),//ok
    logout: () => request('/logout'),
}
export default $api