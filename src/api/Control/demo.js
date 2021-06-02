import request from '@/utils/request'

export function list() {
  return request({
    url: 'entry/aa',
    method: 'post',
  })
}