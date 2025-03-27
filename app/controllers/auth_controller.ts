import User from '#models/user';
import { registerValidator } from '#validators/auth'
import type { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
  
  async register({request, response}: HttpContext) {
    const data = await request.validateUsing(registerValidator);
    const user = await User.create(data);

    return response.status(201).json({message: "Usuario creado correctamente.", data: user});
  }
  
  async login({}: HttpContext) {}
  
  async logout({}: HttpContext) {}
  
  async me({}: HttpContext) {}
  
}