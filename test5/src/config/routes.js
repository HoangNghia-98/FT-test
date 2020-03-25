// isProtected: các route cần được bảo vệ
// Có thể thêm giá trị vào đây
import React from 'react'

const Dashboard      = React.lazy(() => import('../pages/Dashboard')) 
const FunctionFoo    = React.lazy(() => import('../pages/FunctionFoo')) 
const Functions      = React.lazy(() => import('../pages/Functions'))  
const Login          = React.lazy(() => import('../pages/Login'))  
const PageNotFound   = React.lazy(() => import('../pages/PageNotFound'))  
const Setting        = React.lazy(() => import('../pages/Setting'))  

export default [
  {
    title: 'Login Page | Sample App',
    component: Login,
    path: '/login',
    isProtected: false
  },
  {
    title: 'Dashboard | Sample App',
    component: Dashboard,
    path: '/dashboard',
    isProtected: true
  },
  {
    title: 'Setting | Sample App',
    component: Setting,
    path: '/setting',
    isProtected: true
  },
  {
    title: 'Functions',
    component: Functions,
    path: '/functions',
    isProtected: true,
  },
  {
    title: 'Functions',
    component: FunctionFoo,
    path: '/functions/foo',
    isProtected: true
  },
  {
    title: 'Functions',
    component: Dashboard,
    path: '/',
    isProtected: true
  },
  {
    title: 'Page not found',
    component: PageNotFound,
    path: '*',
    isProtected: false
  }
]