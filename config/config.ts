import { defineConfig } from 'umi';
import routes from './routes';
import { TITLE } from '../src/utils/constant';

export default defineConfig({
  title: TITLE,
  hash: true,
  routes: routes,
});
