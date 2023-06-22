import { createRouter, createWebHashHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import ContactsIndex from '../pages/ContactsIndex.vue'
import ContactsDetails from '../pages/ContactDetails.vue'
import ContactsEdit from '../pages/ContactEdit.vue'
import Statistics from '../pages/Statistics.vue'

const routerOptions = {
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/stats',
      name: 'statistics',
      component: Statistics,
    },
    {
      path: '/contact',
      name: 'contacts',
      component: ContactsIndex,
    },
    {
      path: '/contact/:id',
      name: 'details',
      component: ContactsDetails,
    },
    {
      path: '/contact/edit/:id?',
      name: 'edit',
      component: ContactsEdit,
    },
  ],
}
const router = createRouter(routerOptions)

export default router
