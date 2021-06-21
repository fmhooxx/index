import request from '@/utils/request'
// 注册人与车统计接口
export function getCount() {
  return request({
    url: 'driver/getCount',
    method: 'get',
  })
}
// 注册司机列表接口
export function getList(params) {
  return request({
    url: 'driver/list',
    method: 'get',
    params: params
  })
}
// 车辆到港分析接口
export function getOrderList(params) {
  return request({
    url: 'order/list',
    method: 'get',
    params: params
  })
}
// 港区预约统计数据
export function getOrderCount() {
  return request({
    url: 'order/getOrderCount',
    method: 'get',
  })
}