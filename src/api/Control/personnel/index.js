import request from '@/utils/request'
// 重点人员列表接口
export function getList(params) {
  return request({
    url: 'KeyPersonnel/list',
    method: 'get',
    params: params
  })
}
// 打标签(已阅)
export function updateStatus(params) {
  return request({
    url: `KeyPersonnel/updateStatus/${params}`,
    method: 'get',
  })
}