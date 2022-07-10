import { createRouter, createWebHistory } from 'vue-router';

import type { RouteRecordRaw } from 'vue-router';
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Introduce',
    component: () => import('@views/Introduce.vue')
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
