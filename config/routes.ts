export default [
  {
    path: '/',
    component: '@/layouts/index',
    routes: [
      { path: '/', redirect: '/home' },
      { path: '/home', component: 'index' },
      { path: '/todo', component: 'todo' },
      { component:'./404'}
    ],
  }
];
