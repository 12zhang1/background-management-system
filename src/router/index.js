import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'


//路由配置
//常量路由，不管用户是什么角色都可以访问
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'el-icon-s-home' }//dashboard
    }]
  },

  // {
  //   path: '/product',
  //   component: Layout,
  //   name: 'Product',
  //   meta: { title: '商品管理', icon: 'el-icon-goods' },
  //   children: [
  //     {
  //       path: 'trademark',
  //       name: 'tradeMark',
  //       component: () => import('@/views/product/tradeMark'),
  //       meta: { title: '品牌管理', },
  //     },
  //     {
  //       path: 'attr',
  //       name: 'Attr',
  //       component: () => import('@/views/product/Attr'),
  //       meta: { title: '平台属性管理', },
  //     },
  //     {
  //       path: 'spu',
  //       name: 'Spu',
  //       component: () => import('@/views/product/Spu'),
  //       meta: { title: 'Spu管理', },
  //     },
  //     {
  //       path: 'sku',
  //       name: 'Sku',
  //       component: () => import('@/views/product/Sku'),
  //       meta: { title: 'Sku管理', },
  //     },

  //   ]
  // },
  // {
  //   path: '/acl',
  //   component: Layout,
  //   name: 'Acl',
  //   redirect: '/acl/user/list',
  //   meta: { title: '权限管理', icon: 'el-icon-lock' },//dashboard
  //   children: [
  //     {
  //       path: 'user/list',
  //       name: 'user',
  //       component: () => import('@/views/acl/user/list'),
  //       meta: { title: '用户管理', },
  //     },
  //     {
  //       path: 'role/list',
  //       name: 'role',
  //       component: () => import('@/views/acl/role/list'),
  //       meta: { title: '角色管理', },
  //     },
  //     {
  //       path: 'role/auth/:id',
  //       name: 'RoleAuth',
  //       component: () => import('@/views/acl/role/rouleAuth'),
  //       meta: {
  //         title: '角色授权',
  //         activeMenu: '/acl/role/list'
  //       },
  //       hidden: true,
  //     },
  //     {
  //       path: 'permission/list',
  //       name: 'permission',
  //       component: () => import('@/views/acl/permission/list'),
  //       meta: { title: '菜单管理', },
  //     },
  //   ]
  // },
  // {
  //   path: '/test',
  //   component: Layout,
  //   name: 'Test',
  //   meta: { title: '测试', icon: 'el-icon-setting' },//dashboard
  //   children: [
  //     {
  //       path: 'test1',
  //       name: 'Test1',
  //       component: () => import('@/views/Test/Test1'),
  //       meta: { title: '小风扇', },
  //     },
  //     {
  //       path: 'test2',
  //       name: 'Test2',
  //       component: () => import('@/views/Test/Test2'),
  //       meta: { title: '测试', },
  //     },
  //   ]
  // },
]

//异步路由：不同的用户(角色),需要过滤筛选出的路由，称之为异步路由
export const asyncRoutes = [
  {
    path: '/product',
    component: Layout,
    name: 'Product',
    meta: { title: '商品管理', icon: 'el-icon-goods' },
    children: [
      {
        path: 'trademark',
        name: 'tradeMark',
        component: () => import('@/views/product/tradeMark'),
        meta: { title: '品牌管理',icon:'el-icon-menu' },
      },
      {
        path: 'attr',
        name: 'Attr',
        component: () => import('@/views/product/Attr'),
        meta: { title: '平台属性管理',icon:'el-icon-menu' },
      },
      {
        path: 'spu',
        name: 'Spu',
        component: () => import('@/views/product/Spu'),
        meta: { title: 'Spu管理',icon:'el-icon-menu' },
      },
      {
        path: 'sku',
        name: 'Sku',
        component: () => import('@/views/product/Sku'),
        meta: { title: 'Sku管理',icon:'el-icon-menu' },
      },

    ]
  },
  {
    path: '/acl',
    component: Layout,
    name: 'Acl',
    redirect: '/acl/user/list',
    meta: { title: '权限管理', icon: 'el-icon-lock' },//dashboard
    children: [
      {
        path: 'user/list',
        name: 'User',
        component: () => import('@/views/acl/user/list'),
        meta: { title: '用户管理',icon:'el-icon-user' },
      },
      {
        path: 'role/list',
        name: 'Role',
        component: () => import('@/views/acl/role/list'),
        meta: { title: '角色管理',icon:'el-icon-s-custom' },
      },
      {
        path: 'role/auth/:id',
        name: 'RoleAuth',
        component: () => import('@/views/acl/role/rouleAuth'),
        meta: {
          title: '角色授权',
          activeMenu: '/acl/role/list'
        },
        hidden: true,
      },
      {
        path: 'permission/list',
        name: 'Permission',
        component: () => import('@/views/acl/permission/list'),
        meta: { title: '菜单管理',icon:'el-icon-menu' },
      },
    ]
  },
  {
    path: '/test',
    component: Layout,
    name: 'Test',
    meta: { title: '测试', icon: 'el-icon-setting' },//dashboard
    children: [
      {
        path: 'test1',
        name: 'Test1',
        component: () => import('@/views/Test/Test1'),
        meta: { title: '小风扇',},
      },
      {
        path: 'test2',
        name: 'Test2',
        component: () => import('@/views/Test/Test2'),
        meta: { title: '测试',},
      },
    ]
  },
]
//任意路由
export const anyRoutes = [
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  //滚动行为
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes,
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
