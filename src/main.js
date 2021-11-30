import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

import App from './App.vue';
import NotFound from '@/components/nav/NotFound';
import TeamsList from '@/components/teams/TeamsList';
import UsersList from '@/components/users/UsersList';
import TeamMembers from '@/components/teams/TeamMembers';
import TeamsFooter from '@/components/teams/TeamsFooter';
import UsersFooter from '@/components/users/UsersFooter';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/teams',
    },
    {
      name: 'teams',
      path: '/teams',
      components: { default: TeamsList, footer: TeamsFooter },
      children: [
        {
          name: 'team-member',
          path: ':teamId',
          component: TeamMembers,
          props: true,
        },
      ],
    },
    {
      path: '/users',
      components: { default: UsersList, footer: UsersFooter },
    },
    // (.*) - regExp for every character after /
    {
      path: '/:notFound(.*)',
      component: NotFound,
    },
  ],
  linkActiveClass: 'active',
  scrollBehavior: (_, _2, savedPosition) => {
    return savedPosition || { left: 0, top: 0 };
  },
});

router.beforeEach((_, _2, next) => {
  console.log('Global beforeEach');
  next();
});

const app = createApp(App);

app.use(router);

app.mount('#app');
