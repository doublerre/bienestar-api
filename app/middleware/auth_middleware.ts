import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import type { Authenticators } from '@adonisjs/auth/types'

/**
 * Auth middleware is used authenticate HTTP requests and deny
 * access to unauthenticated users.
 */
export default class AuthMiddleware {
  /**
   * The URL to redirect to, when authentication fails
   */
  redirectTo = '/login'

  async handle(
    ctx: HttpContext,
    next: NextFn,
    options: {
      guards?: (keyof Authenticators)[]
    } = {}
  ) {
    try{
      await ctx.auth.authenticateUsing(options.guards)
    } catch (error) {
      // Manejar diferentes tipos de errores de autenticación
      switch (error.code) {
        case 'E_INVALID_AUTH_TOKEN':
          return ctx.response.unauthorized({
            error: 'Token inválido.',
            message: 'El token de autenticación proporcionado no es válido.'
          })
        
        case 'E_UNAUTHORIZED_ACCESS':
          return ctx.response.unauthorized({
            error: 'No autorizado.',
            message: 'Debes iniciar sesión para acceder a este recurso.'
          })
        
        case 'E_EXPIRED_TOKEN':
          return ctx.response.unauthorized({
            error: 'Token expirado.',
            message: 'Tu sesión ha expirado, por favor inicia sesión nuevamente.'
          })
        
        default:
          return ctx.response.unauthorized({
            error: 'Error de autenticación.',
            message: 'Ocurrió un error al verificar tu autenticación.'
          })
      }
    }
    return await next()
  }
}