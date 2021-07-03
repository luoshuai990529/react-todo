export default [
    {
        path: '/',
        component: '@/layouts/index',
        routes: [
            { path: '/', redirect: '/home' },
            { path: '/todo', redirect: '/todo/sundry' },
            { path: '/home', component: 'index', name: '首页' },
            {
                name: '杂事项',
                path: '/todo/sundry',
                component: 'todo',
            },
            {
                name: '今日待办',
                path: '/todo/today',
                component: 'todo',
            },
            {
                name: '预览',
                path: '/todo/preview',
                component: 'todo',
            },
            {
                path: '/todo/project',
                component: 'todo',
            },
            { component: './404' },
        ],
    },
];
