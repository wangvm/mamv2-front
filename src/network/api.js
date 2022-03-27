import request from "@/network/request"

const $api = {
    login: (account, password) => request('/login', { account, password }, 'POST'),//ok
    register: (userList) => request('/user/add', { userList }, 'POST'),//ok
    logout: () => request('/logout'),
}
export default $api