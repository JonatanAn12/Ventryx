import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

export default class AuthController {
  public async login({ request, response }: HttpContext) {
    const { correo, contrasena } = request.only(['correo', 'contrasena']);

    try {
      // Verificar las credenciales del usuario
      const user = await User.verifyCredentials(correo, contrasena);

      // Generar un token de acceso
      const token = await user.createToken();

      // Devolver el token y los datos del usuario
      return response.status(200).json({
        token: token.token,
        user: {
          id: user.id,
          correo: user.correo,
          contrasena: user.contrasena,
        },
      });
    } catch (error) {
      console.error('Error en el login:', error);
      return response.status(401).json({ error: 'Credenciales inválidas' });
    }
  }
}