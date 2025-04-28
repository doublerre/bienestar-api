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
import SubcommitteesController from '#controllers/subcommittees_controller';
import DependenciesController from '#controllers/dependencies_controller';
import MeasurementUnitsController from '#controllers/measurement_units_controller';

router.get('/', async () => {
  return {
    message: 'Autentifiquese para acceder a la API.',
  }
})

router.group(() => {
  router.group(() => {
    router.post('register', [AuthController, 'register']).as('auth.register').use([middleware.auth() ,middleware.checkRoles(["ROLE_ADMIN"])]);
    router.post('login', [AuthController, 'login']).as('auth.login');

    router.resource('year-name', YearNamesController).apiOnly().as('year-name').use("*", [middleware.auth(), middleware.checkRoles(["ROLE_ADMIN"])]);

    router.resource('subcommittee', SubcommitteesController).apiOnly().as('subcommittee').use("*", [middleware.auth(), middleware.checkRoles(["ROLE_ADMIN"])]);

    router.resource('dependency', DependenciesController).apiOnly().as('dependency').use("*", [middleware.auth(), middleware.checkRoles(["ROLE_ADMIN", "ROLE_SUBCOMITE"])]);

    router.resource('measurement-unit', MeasurementUnitsController).apiOnly().as('measurement-unit').use("*", [middleware.auth(), middleware.checkRoles(["ROLE_ADMIN"])]);
  }).prefix('v1');
}).prefix('api')