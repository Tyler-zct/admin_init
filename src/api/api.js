import request from '@/utils/request'

// 资讯管理
export function createNews(data) {
  return request({
    url: '/news/create',
    method: 'post',
    data: data
  })
}

export function searchNews(data) {
  return request({
    url: '/news/search',
    method: 'post',
    params: data
  })
}

export function newsDetails(para) {
  return request({
    url: '/news',
    method: 'get',
    params: para
  })
}

export function updNews(id, data) {
  return request({
    url: '/news/' + id + '/update',
    method: 'post',
    data: data
  })
}

export function newsOff(id) {
  return request({
    url: '/news/' + id + '/off',
    method: 'post'
  })
}

export function newsPublish(id) {
  return request({
    url: '/news/' + id + '/publish',
    method: 'post'
  })
}

export function getNews(id) {
  return request({
    url: '/news/' + id,
    method: 'get'
  })
}

// appBanner
export function queryBanner(data) {
  return request({
    url: '/app/banner/query',
    method: 'post',
    params: data
  })
}

export function updBanner(id, data) {
  return request({
    url: '/app/banner/upd/' + id,
    method: 'post',
    params: data
  })
}

export function findBanner(id) {
  return request({
    url: '/app/banner/query/' + id,
    method: 'get'
  })
}

// 用户管理
export function userRobot(data) {
  return request({
    url: '/user/robot',
    method: 'post',
    params: data
  })
}

export function queryUser(para) {
  return request({
    url: '/user/query',
    method: 'get',
    params: para
  })
}

export function findUser(id) {
  return request({
    url: '/user/' + id,
    method: 'get'
  })
}

export function forbiddenUser(id, data) {
  return request({
    url: '/user/' + id + '/forbidden',
    method: 'post',
    params: data
  })
}

// 账单管理
export function queryBill(para) {
  return request({
    url: '/account/bill/query',
    method: 'post',
    params: para
  })
}

export function insertBill(data) {
  return request({
    url: '/account/bill',
    method: 'put',
    data
  })
}

export function searchBill(data) {
  return request({
    url: '/account/bill/search',
    method: 'post',
    params: data
  })
}

export function deleteBill(id) {
  return request({
    url: '/account/bill/' + id,
    method: 'delete'
  })
}

export function findBill(no) {
  return request({
    url: '/account/bill/query/' + no,
    method: 'get'
  })
}

export function updateBill(id, data) {
  return request({
    url: '/account/bill/' + id,
    method: 'put',
    data
  })
}

// corporate/certification
export function getCorporate(para) {
  return request({
    url: '/corporate/certification',
    method: 'get',
    prams: para
  })
}

export function insertCorporate(data) {
  return request({
    url: '/corporate/certification',
    method: 'put',
    data
  })
}

export function queryCorporate(data) {
  return request({
    url: '/corporate/certification/query',
    method: 'post',
    params: data
  })
}

export function searchCorporate(data) {
  return request({
    url: '/corporate/certification/search',
    method: 'post',
    params: data
  })
}

export function deleteCorporate(id) {
  return request({
    url: '/corporate/certification/' + id,
    method: 'delete'
  })
}

export function findCorporate(id) {
  return request({
    url: '/corporate/certification/' + id,
    method: 'get'
  })
}

export function updateCorporate(id, data) {
  return request({
    url: '/corporate/certification/' + id,
    method: 'put',
    data
  })
}

// dashboard
export function dashboard() {
  return request({
    url: '/dashboard',
    method: 'get'
  })
}

// fruit
export function getFruit(para) {
  return request({
    url: '/fruit',
    method: 'get',
    prams: para
  })
}

export function insertFruit(data) {
  return request({
    url: '/fruit',
    method: 'put',
    data
  })
}

export function queryFruit(data) {
  return request({
    url: '/fruit/query',
    method: 'post',
    params: data
  })
}

export function searchFruit(data) {
  return request({
    url: '/fruit/search',
    method: 'post',
    params: data
  })
}

export function deleteFruit(id) {
  return request({
    url: '/fruit/' + id,
    method: 'delete'
  })
}

export function findFruit(id) {
  return request({
    url: '/fruit/' + id,
    method: 'get'
  })
}

export function updateFruit(id, data) {
  return request({
    url: '/fruit/' + id,
    method: 'put',
    data
  })
}

// 采购管理
export function forbiddenPurchasing(id, data) {
  return request({
    url: '/purchasing/' + id + '/forbidden',
    method: 'post',
    params: data
  })
}

export function getPurchasing(para) {
  return request({
    url: '/purchasing',
    method: 'get',
    prams: para
  })
}

export function insertPurchasing(data) {
  return request({
    url: '/purchasing',
    method: 'put',
    data
  })
}

export function queryPurchasing(data) {
  return request({
    url: '/purchasing/query',
    method: 'post',
    params: data
  })
}

export function searchPurchasing(data) {
  return request({
    url: '/purchasing/search',
    method: 'post',
    params: data
  })
}

export function deletePurchasing(id) {
  return request({
    url: '/purchasing/' + id,
    method: 'delete'
  })
}

export function findPurchasing(id) {
  return request({
    url: '/purchasing/' + id,
    method: 'get'
  })
}

export function updatePurchasing(id, data) {
  return request({
    url: '/purchasing/' + id,
    method: 'put',
    data
  })
}

// 管理员管理
export function insertAdmin(data) {
  return request({
    url: '/admin/create',
    method: 'put',
    params: data
  })
}

export function queryAdmin(data) {
  return request({
    url: '/admin/query',
    method: 'get',
    params: data
  })
}

export function findAdmin(id) {
  return request({
    url: '/admin/query/' + id,
    method: 'get'
  })
}

export function deleteAdmin(id) {
  return request({
    url: '/admin/del/' + id,
    method: 'delete'
  })
}

export function updateAdmin(id, data) {
  return request({
    url: '/admin/upd/' + id,
    method: 'post',
    params: data
  })
}

// 角色管理
export function insertRole(params, data) {
  return request({
    url: '/role/add',
    method: 'put',
    data: data,
    params: params
  })
}

export function queryRole(data) {
  return request({
    url: '/role/query',
    method: 'get',
    params: data
  })
}

export function findRole(id) {
  return request({
    url: '/role/query/' + id,
    method: 'get'
  })
}

export function deleteRole(id) {
  return request({
    url: '/role/del/' + id,
    method: 'delete'
  })
}

export function updateRole(id, data) {
  return request({
    url: '/role/upd/' + id,
    method: 'post',
    data: data
  })
}

export function getMenus() {
  return request({
    url: '/admin/menus',
    method: 'get'
  })
}

export function getOperations() {
  return request({
    url: '/admin/operations',
    method: 'get'
  })
}

export function getAllRole() {
  return request({
    url: '/role/query/all',
    method: 'get'
  })
}

export function getRole(para) {
  return request({
    url: '/role',
    method: 'get',
    prams: para
  })
}

export function searchRole(data) {
  return request({
    url: '/role/search',
    method: 'post',
    params: data
  })
}

// 供应管理
export function forbiddenSupply(id, data) {
  return request({
    url: '/supply/' + id + '/forbidden',
    method: 'post',
    params: data
  })
}

export function querySupply(data) {
  return request({
    url: '/supply/query',
    method: 'post',
    params: data
  })
}

export function findSupply(id) {
  return request({
    url: '/supply/' + id,
    method: 'get'
  })
}

export function getSupply(para) {
  return request({
    url: '/supply',
    method: 'get',
    prams: para
  })
}

export function insertSupply(data) {
  return request({
    url: '/supply',
    method: 'put',
    data
  })
}

export function searchSupply(data) {
  return request({
    url: '/supply/search',
    method: 'post',
    params: data
  })
}

export function deleteSupply(id) {
  return request({
    url: '/supply/' + id,
    method: 'delete'
  })
}

export function updateSupply(id, data) {
  return request({
    url: '/supply/' + id,
    method: 'put',
    data
  })
}
