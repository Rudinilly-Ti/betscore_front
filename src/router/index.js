import ClassificacaoComponente from '@/components/ClassificacaoComponent.vue';
import { createRouter, createWebHistory } from 'vue-router';
import AgendaTimeComponent from '../components/AgendaTimeComponent.vue';
import PartidasAoVivoComponent from '../components/PartidasAoVivoComponent.vue'; // Importação correta do componente
import PartidasComponent from '../components/PartidasComponent.vue';

const routes = [
  {
    path: '/detalhes/:id',
    name: 'detalhes',
    component: PartidasAoVivoComponent
  },
  {
    path: '/',
    name: 'home',
    component: PartidasComponent,
  },

  {
    path: '/agenda/time/:id',
    name: 'partidasAgendadas',
    component: AgendaTimeComponent,
  },
  {
    path: "/classificacao",
    name: "classificacao",
    component: ClassificacaoComponente
  },

  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
