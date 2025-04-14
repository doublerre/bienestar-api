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
import YearNamesController from '#controllers/year_names_controller';

router.get('/', async () => {
  return {
    message: 'Autentifiquese para acceder a la API.',
  }
})

router.group(() => {
  router.group(() => {
    router.post('register', [AuthController, 'register']).as('auth.register').use([middleware.auth() ,middleware.checkRoles(["ROLE_ADMIN"])]);
    router.post('login', [AuthController, 'login']).as('auth.login');

    router.post('year-name', [YearNamesController, 'create']).as('year-name.create').use([middleware.auth() ,middleware.checkRoles(["ROLE_ADMIN"])]);
    router.get('year-name', [YearNamesController, 'index']).as('year-name.index').use([middleware.auth() ,middleware.checkRoles(["ROLE_ADMIN"])]);
    router.get('year-name/:id', [YearNamesController, 'show']).as('year-name.show').use([middleware.auth() ,middleware.checkRoles(["ROLE_ADMIN"])]);
    router.delete('year-name/:id', [YearNamesController, 'destroy']).as('year-name.destroy').use([middleware.auth() ,middleware.checkRoles(["ROLE_ADMIN"])]);
  }).prefix('v1');
}).prefix('api')