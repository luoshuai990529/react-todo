import { MenuDataItem } from '@ant-design/pro-layout';
import { ContainerOutlined } from '@ant-design/icons';

const Menu = {
  route: {
    path: '/',
    routes: [
      {
        path: '/index',
        name: '首页',
        component: '@/pages/index',
        icon: <ContainerOutlined />,
      },
      {
        path: '/todo',
        name: 'Todo',
        component: '@/pages/todo',
        icon: <ContainerOutlined />,
      },
      {
        path: '/article',
        name: '文章',
        icon: <ContainerOutlined />,
      },
    ],
  },
  location: {
    pathname: '/',
  },
};
export default Menu;
