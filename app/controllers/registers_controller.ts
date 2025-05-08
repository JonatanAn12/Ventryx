import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

export default class RegistersController {
    public async register({ request, response }: HttpContext) {
        try {
          const requestData = request.only(['nombre', 'correo', 'contrasena'])
          const user = await User.create({
            nombre: requestData.nombre,
            correo: requestData.correo,
            contrasena: requestData.contrasena, // Será encriptada automáticamente si tienes un hook en el modelo
          })
          return response.status(201).json({ message: 'Usuario registrado con éxito', user })
        } catch (error) {
          console.error('Error al registrar el usuario:', error)
          return response.status(500).json({ error: 'Error al registrar el usuario' })
        }
      }
    
}