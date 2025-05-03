import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

export default class AuthController{
   async login({ request }: HttpContext) { 
        const { correo, contrasena } = request.only(['correo', 'contrasena'])
        const user = await User.verifyCredentials(correo, contrasena)
        const token = await User.accessTokens.create(user)
        return token
    }
      } 