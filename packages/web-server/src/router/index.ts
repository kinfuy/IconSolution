import { createRouter, createWebHistory } from 'vue-router';
//类型声明
import type { RouteRecordRaw } from 'vue-router';
//
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'iconlibrary',
    component: () => import('@views/IconLibrary.vue')
  },
  {
    path: '/project',
    name: 'project',
    component: () => import('@views/Project.vue')
  },
  {
    path: '/team',
    name: 'team',
    component: () => import('@views/Team.vue')
  },
  {
    path: '/homepage',
    name: 'homepage',
    component: () => import('@views/Homepage.vue')
  },
  {
    path: '/upload',
    name: 'upload',
    component: () => import('@views/Upload.vue')
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
