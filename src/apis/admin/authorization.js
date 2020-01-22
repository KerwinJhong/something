import { apiHelper } from '../../utils/helpers'

export default {
  signIn({ username, password }) {
    return apiHelper.post('/signin', {
      username,
      password
    })
  },
  signUp(data) {
    return apiHelper.post('/signup', {
      ...data
    })
  },
  getCurrentUser() {
    return apiHelper.get(`/user`)
  }
}