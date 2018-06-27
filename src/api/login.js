import request from '@/utils/request'

export function loginByUsername(username, password) {
  const data = new URLSearchParams()
  data.append('username', username)
  data.append('password', password)
  return request({
    url: '/admin/login',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/admin/logout',
    method: 'post'
  })
}

export function getUserInfo() {
  return request({
    url: 'admin/login/token',
    method: 'post'
  })
}
