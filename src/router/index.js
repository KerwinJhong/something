import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

Vue.use(VueRouter)

const authentication = {
  isAdmin(to, from, next) {
    const currentUser = store.state.currentUser
    if (currentUser && currentUser.role !== "admin") {
      next({ name: 'sign-in' })
      return
    }
    next()
  },
  isMember(to, from, next) {
    const currentUser = store.state.currentUser
      // redirect to 404 if user is not an Member
    if (currentUser && currentUser.role !== 'member') {
      next({ name: 'sign-in' })
      return
    }
    next()
  }
}


const routes = [
  // ====================  Member  ====================
  {
    path: '/member/orderstate',
    name: 'member-order-state',
    component: () =>
      import ('../views/member/MemberOrderState.vue'),
    beforeEnter: authentication.isMember
  }, {
    path: '/member/menu',
    name: 'member-menu',
    component: () =>
      import ('../views/member/MemberMenu.vue'),
    beforeEnter: authentication.isMember
  }, {
    path: '/member/orderlist',
    name: 'member-order-list',
    component: () =>
      import ('../views/member/MemberOrderList.vue'),
    beforeEnter: authentication.isMember
  }, {
    path: '/member/profile',
    name: 'member-profile',
    component: () =>
      import ('../views/member/MemberProfile.vue'),
    beforeEnter: authentication.isMember
  }, {
    path: '/member/myorders',
    name: 'member-my-orders',
    component: () =>
      import ('../views/member/MemberMyOrders.vue'),
    beforeEnter: authentication.isMember
  }, {
    path: '/member/password',
    name: 'member-password',
    component: () =>
      import ('../views/member/MemberPassword.vue'),
    beforeEnter: authentication.isMember
  },

  // ====================  Admin  ====================
  {
    path: '/',
    name: 'root',
    redirect: '/signin'
  }, {
    path: '/signin',
    name: 'sign-in',
    component: () =>
      import ('../views/SignIn.vue')
  }, {
    path: '/signup',
    name: 'sign-up',
    component: () =>
      import ('../views/SignUp.vue')
  }, {
    path: '/admin/order',
    name: 'admin-order',
    component: () =>
      import ('../views/admin/AdminOrder.vue'),
    beforeEnter: authentication.isAdmin
  }, {
    path: '/admin/manage/members',
    name: 'admin-manage-members',
    component: () =>
      import ('../views/admin/AdminManageMember.vue'),
    beforeEnter: authentication.isAdmin
  }, {
    path: '/admin/dayorders',
    name: 'admin-day-orders',
    component: () =>
      import ('../views/admin/AdminDayOrders.vue'),
    beforeEnter: authentication.isAdmin
  }, {
    path: '/admin/manage/meal',
    name: 'admin-manage-meal',
    component: () =>
      import ('../views/admin/AdminManageMeal.vue'),
    beforeEnter: authentication.isAdmin
  }, {
    path: '/admin/manage/categories',
    name: 'admin-manage-categories',
    component: () =>
      import ('../views/admin/AdminManageCategories.vue'),
    beforeEnter: authentication.isAdmin
  }, {
    path: '/admin/manage/tages',
    name: 'admin-manage-tages',
    component: () =>
      import ('../views/admin/AdminManageTags.vue'),
    beforeEnter: authentication.isAdmin
  }, {
    path: '/admin/dish/:id/edit',
    name: 'admin-dish-edit',
    component: () =>
      import ('../views/admin/AdminDishEdit.vue'),
    beforeEnter: authentication.isAdmin
  }, {
    path: '/admin/dish/new',
    name: 'admin-dish-new',
    component: () =>
      import ('../views/admin/AdminDishNew.vue'),
    beforeEnter: authentication.isAdmin
  }, {
    path: '/admin/manage/dashboard/lineChart',
    name: 'admin-dashboard-lineChart',
    component: () =>
      import ('../views/admin/AdminDashBoardLineChart.vue'),
    beforeEnter: authentication.isAdmin
  }, {
    path: '/admin/manage/dashboard/pieChart',
    name: 'admin-dashboard-pieChart',
    component: () =>
      import ('../views/admin/AdminDashBoardPieChart.vue'),
    beforeEnter: authentication.isAdmin
  }, {
    path: '/admin/profile/edit',
    name: 'admin-profile',
    component: () =>
      import ('../views/admin/AdminProfile.vue'),
    beforeEnter: authentication.isAdmin
  }, {
    path: '/admin/password',
    name: 'admin-password',
    component: () =>
      import ('../views/admin/AdminPassword.vue'),
    beforeEnter: authentication.isAdmin
  }, {
    path: '*',
    name: 'not-found',
    component: () =>
      import ('../views/NotFound.vue')
  }
]

const router = new VueRouter({
  linkExactActiveClass: 'active',
  mode: 'history',
  routes
})

router.beforeEach(async(to, from, next) => {
  const tokenInLocalStorage = localStorage.getItem('token')
  const tokenInStore = store.state.token
  let isAuthenticated = store.state.isAuthenticated

  // 比較 localStorage 和 store 中的 token 是否一樣
  if (tokenInLocalStorage && tokenInLocalStorage !== tokenInStore) {
    isAuthenticated = await store.dispatch('fetchCurrentUser')
  }

  // 對於不需要驗證 token 的頁面
  const pathsWithoutAuthentication = ['sign-in', 'sign-up']
  if (pathsWithoutAuthentication.includes(to.name)) {
    next()
    return
  }

  // 如果 token 無效則轉址到登入頁
  if (!isAuthenticated && to.name !== 'sign-in') {
    next('/signin')
    return
  }

  if (isAuthenticated && store.state.currentUser.role === 'admin' && to.name === 'sign-in') {
    next('/admin/order')
    return
  }

  if (isAuthenticated && store.state.currentUser.role === 'member' && to.name === 'sign-in') {
    next('/member/menu')
    return
  }

  next()
})

export default router