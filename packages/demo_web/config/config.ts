import { defineConfig } from 'umi';
// import { routes } from './routes';

export default defineConfig({
  npmClient: 'yarn',
  // proxy: {
  //   '/api/': {
  //     target: 'http://112.126.79.110',
  //     changeOrigin: true,
  //   },
  // },
  // routes,
  mfsu: false,
  // targets: {
  //   ie: 11,
  // },
  // jsMinifier: 'terser',
});
