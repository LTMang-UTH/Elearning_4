export const authRoutes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
    meta: {
      requiresAuth: false,
      layout: 'AuthLayout',
      title: 'Login'
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/Register.vue'),
    meta: {
      requiresAuth: false,
      layout: 'AuthLayout',
      title: 'Register'
    }
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: () => import('@/views/ForgotPassword.vue'),
    meta: {
      requiresAuth: false,
      layout: 'AuthLayout',
      title: 'Forgot Password'
    }
  },
  {
    path: '/reset-password/:token',
    name: 'ResetPassword',
    component: () => import('@/views/ResetPassword.vue'),
    meta: {
      requiresAuth: false,
      layout: 'AuthLayout',
      title: 'Reset Password'
    }
  }
]

export const blogRoutes = [
  {
    path: '/blogs',
    name: 'BlogList',
    component: () => import('@/views/BlogList.vue'),
    meta: {
      requiresAuth: false,
      title: 'Blogs'
    }
  },
  {
    path: '/blogs/create',
    name: 'BlogCreate',
    component: () => import('@/views/BlogCreate.vue'),
    meta: {
      requiresAuth: true,
      title: 'Create Blog'
    }
  },
  {
    path: '/blogs/:id',
    name: 'BlogDetail',
    component: () => import('@/views/BlogDetail.vue'),
    meta: {
      requiresAuth: false,
      title: 'Blog Detail'
    }
  },
  {
    path: '/blogs/:id/edit',
    name: 'BlogEdit',
    component: () => import('@/views/BlogEdit.vue'),
    meta: {
      requiresAuth: true,
      title: 'Edit Blog'
    }
  },
  {
    path: '/my-blogs',
    name: 'MyBlogs',
    component: () => import('@/views/MyBlogs.vue'),
    meta: {
      requiresAuth: true,
      title: 'My Blogs'
    }
  }
]

export const userRoutes = [
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('@/views/Profile.vue'),
    meta: {
      requiresAuth: true,
      title: 'Profile'
    }
  },
  {
    path: '/profile/edit',
    name: 'ProfileEdit',
    component: () => import('@/views/ProfileEdit.vue'),
    meta: {
      requiresAuth: true,
      title: 'Edit Profile'
    }
  }
]

export const adminRoutes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/views/Dashboard.vue'),
    meta: {
      requiresAuth: true,
      requiresAdmin: true,
      title: 'Dashboard Quản Trị'
    }
  }
]
