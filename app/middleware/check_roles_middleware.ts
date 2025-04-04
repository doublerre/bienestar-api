import User from '#models/user';
import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class CheckRolesMiddleware {
  async handle(ctx: HttpContext, next: NextFn, allowedRoles: string[]) {
    const user = ctx.auth.user;

    if(!user) return ctx.response.unauthorized({message: "Debes iniciar sesión para acceder a este recurso."});

    if(!user.isActive){
      await User.accessTokens.delete(user, user.currentAccessToken.identifier);
      return ctx.response.unauthorized({message: "Usuario inhabilitado, por favor contacta a administración."});
    }

    if(!allowedRoles.includes(user.role)) return ctx.response.forbidden({message: "Acceso denegado, no cuentas con los permisos suficientes para acceder a este recurso."});

    return await next();
  }
}