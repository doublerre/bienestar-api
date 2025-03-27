import User from '#models/user';
import { loginValidator, registerValidator } from '#validators/auth'
import type { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
  
  async register({request, response}: HttpContext) {
    const data = await request.validateUsing(registerValidator);
    const user = await User.create(data);

    return response.status(201).json({message: "Usuario creado correctamente.", data: user});
  }
  
  async login({request, response}: HttpContext) {
    const {username, password} = await request.validateUsing(loginValidator);
    const user = await User.verifyCredentials(username, password);

    const token = await User.accessTokens.create(user);
    return response.status(200).json({message: "Inicio de sesión con exito.", data: token});
  }
  
  async logout({auth, response}: HttpContext) {
    const user = auth.user!;
    await User.accessTokens.delete(user, user.currentAccessToken.identifier);

    return response.status(200).json({message: "Sesión cerrada con exito."});
  }
  
  async me({auth, response}: HttpContext) {
    await auth.check();
    return response.status(200).json({data: auth.user});
  }

}