export const routes = [
  {
    path: '/login',
    component: 'login',
  },
  {
    path: '/404',
    component: '404',
  },
  {
    path: '/',
    component: '@/layouts/main',
    routes: [
      {
        path: '/',
        component: 'home',
      },
      {
        path: '/news',
        component: 'news',
      },
      {
        path: '/news/:id',
        component: 'news/detail',
      },
      {
        path: '/notice',
        component: 'notice',
      },
      {
        path: '/notice/:id',
        component: 'notice/detail',
      },
      {
        path: '/com/:type',
        component: 'com',
      },
      {
        path: '/user/password',
        component: 'user/password',
      },
      {
        path: '/user/message',
        component: 'user/message',
      },
      // 项目创建/编辑
      {
        path: '/project',
        component: 'project',
      },
      // 项目创建
      {
        path: '/project/create',
        component: 'project/form',
      },
      {
        path: '/project/create/:id',
        component: 'project/form',
      },
      // 项目编辑
      {
        path: '/project/update/:id',
        component: 'project/form',
      },
      // 项目详情
      {
        path: '/project/:id',
        component: 'project/detail',
      },
      // 项目对比
      {
        path: '/project/diff',
        component: 'project/diff',
      },
    ],
  },
];
