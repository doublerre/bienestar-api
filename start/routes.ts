/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import AuthController from '#controllers/auth_controller';
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js';

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.group(() => {
  router.group(() => {
    router.post('register', [AuthController, 'register']).as('auth.register').use([middleware.auth() ,middleware.checkRoles(["ROLE_ADMIN"])]);
    router.post('login', [AuthController, 'login']).as('auth.login');
  }).prefix('v1');
}).prefix('api')