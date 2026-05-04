import { createRouter, createWebHistory } from 'vue-router'
import BasicPage from '@sandbox/pages/BasicPage.vue'
import FormPage from '@sandbox/pages/FormPage.vue'
import FeedbackPage from '@sandbox/pages/FeedbackPage.vue'
import DataPage from '@sandbox/pages/DataPage.vue'
import NavigationPage from '@sandbox/pages/NavigationPage.vue'
import OthersPage from '@sandbox/pages/OthersPage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/basic' },
    { path: '/basic', component: BasicPage },
    { path: '/form', component: FormPage },
    { path: '/feedback', component: FeedbackPage },
    { path: '/data', component: DataPage },
    { path: '/navigation', component: NavigationPage },
    { path: '/others', component: OthersPage },
  ],
})

export default router
