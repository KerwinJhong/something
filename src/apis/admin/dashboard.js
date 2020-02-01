import { apiHelper } from '../../utils/helpers'

export default {
  getBasicInfo() {
    return apiHelper.get(`/admin/dashboard`)
  },
  getPieChart({ range }) {
    const searchParams = new URLSearchParams({ range })
    return apiHelper.get(`/admin/dashboard/pieChart?${searchParams.toString()}`)
  },
  getLineChart({ ids, type, range }) {
    const searchParams = new URLSearchParams({ type, range })
    return apiHelper.get(`/admin/dashboard/lineChart?id=${ids[0]}&id=${ids[1]}&id=${ids[2]}&id=${ids[3]}&id=${ids[4]}&${searchParams.toString()}`)
  }
}