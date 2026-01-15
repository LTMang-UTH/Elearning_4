import { createRouter, createWebHistory } from 'vue-router'
import { authRoutes, blogRoutes, userRoutes, adminRoutes } from './routes'
import { authGuard, adminGuard, setPageTitle } from './guards'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    meta: {
      requiresAuth: false,
      title: 'Home'
    }
  },
  ...authRoutes,
  ...blogRoutes,
  ...userRoutes,
  ...adminRoutes,
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFound.vue'),
    meta: {
      title: '404 - Page Not Found'
    }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// Apply guards
router.beforeEach(authGuard)
router.beforeEach(adminGuard)
router.beforeEach(setPageTitle)

export default router
