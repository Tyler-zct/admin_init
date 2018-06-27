import request from '@/utils/request'

export function upload(data) {
  return request({
    url: 'https://upload-z2.qiniup.com',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export function getToken(partition) {
  return request({
    url: '/third/qiniu/upload/refresh',
    method: 'post',
    params: {
      'partition': 'news'
    }
  })
}
