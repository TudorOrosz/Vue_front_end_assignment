import { createRouter, createWebHistory } from 'vue-router'
import AccountList from '../components/AccountList.vue'
import AccountDetail from '../components/AccountDetail.vue'

const routes = [
  { path: '/', component: AccountList },
  { path: '/account/:accountNumber', component: AccountDetail, props: true }
]

const router = createRouter({ history: createWebHistory(), routes })

export default router