import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { Hash } from '@adonisjs/core/hash'

export default class RecupContrasController {
    public async forgotPassword({ request, response }: HttpContext) {
      const { correo } = request.only(['correo'])
  
      try {
        const user = await User.findBy('correo', correo)
        if (!user) {
          return response.status(404).json({ error: 'Usuario no encontrado' })
        }
  
        // Generar un token de recuperación
        const resetToken = Math.random().toString(36).substring(2, 15)
  
        // Guardar el token usando el modelo AccessToken
        await AccessToken.create({
          userId: user.id,
          token: resetToken,
          type: 'password_reset',
        })
  
        // Simulación de envío de correo
        console.log(`Token de recuperación para ${correo}: ${resetToken}`)
  
        return response.status(200).json({ message: 'Correo de recuperación enviado' })
      } catch (error) {
        return response.status(500).json({ error: 'Error al procesar la solicitud' })
      }
    }
  
    public async resetPassword({ request, response }: HttpContext) {
      const { token, nuevaContrasena } = request.only(['token', 'nuevaContrasena'])
  
      try {
        // Buscar el token usando el modelo AccessToken
        const tokenData = await AccessToken.query()
          .where('token', token)
          .andWhere('type', 'password_reset')
          .first()
  
        if (!tokenData) {
          return response.status(404).json({ error: 'Token inválido o expirado' })
        }
  
        // Buscar al usuario asociado al token
        const user = await User.find(tokenData.userId)
        if (!user) {
          return response.status(404).json({ error: 'Usuario no encontrado' })
        }
  
        // Actualizar la contraseña del usuario
        user.contrasena = await Hash.make(nuevaContrasena)
        await user.save()
  
        // Eliminar el token después de usarlo
        await tokenData.delete()
  
        return response.status(200).json({ message: 'Contraseña restablecida con éxito' })
      } catch (error) {
        return response.status(500).json({ error: 'Error al procesar la solicitud' })
      }
    }
  }