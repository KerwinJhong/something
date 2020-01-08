import { apiHelper } from '../../utils/helpers'

export default {
  dishes: {
    get({ categoryId }) {
      const searchParams = new URLSearchParams({ categoryId })
      return apiHelper.get(`/admin/dishes?${searchParams.toString()}`)
    }
  },
  dish: {
    get(dishId) {
      return apiHelper.get(`/admin/dishes/${dishId}`)
    },
    post(formData) {
      return apiHelper.post(`/admin/dishes`, formData)
    },
    put({ dishId, formData }) {
      return apiHelper.put(`/admin/dishes/${dishId}`, formData)
    },
    delete(dishId) {
      return apiHelper.delete(`/admin/dishes/${dishId}`)
    }
  }
}