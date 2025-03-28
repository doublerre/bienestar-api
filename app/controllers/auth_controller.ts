import User from '#models/user';
import { loginValidator, registerValidator } from '#validators/auth'
import type { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
  
  async register({request, response}: HttpContext) {
    const data = await request.validateUsing(registerValidator);
    const user = await User.create(data);

    return response.created({message: "Usuario creado correctamente.", data: user});
  }
  
  async login({request, response}: HttpContext) {
    const {username, password} = await request.validateUsing(loginValidator);
    const user = await User.verifyCredentials(username, password);

    if(!user.isActive) return response.unauthorized({message: "Usuario inhabilitado, por favor contacta a administración."})

    const token = await User.accessTokens.create(user, ["*"], {expiresIn: "30 mins", name: "SESSION_TOKEN"});
    return response.ok({message: "Inicio de sesión con exito.", data: token});
  }
  
  async logout({auth, response}: HttpContext) {
    const user = auth.user!;
    await User.accessTokens.delete(user, user.currentAccessToken.identifier);

    return response.ok({message: "Sesión cerrada con exito."});
  }
  
  async me({auth, response}: HttpContext) {
    await auth.check();
    return response.ok({data: auth.user});
  }

}