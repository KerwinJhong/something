import { apiHelper } from '../../utils/helpers'

export default {
  get() {
    return apiHelper.get(`/member/orders`)
  },
  getTodayOrder() {
    return apiHelper.get(`/member/orders/today`)
  },
  post(formData) {
    return apiHelper.post(`/member/orders`, formData)
  }
}