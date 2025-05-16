// filepath: /home/jonatan/Escritorio/crud/crud/database/seeders/user_seeder.ts
import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  public async run() {
    const existingUser = await User.findBy('correo', 'jonatan@example.com')
    if (!existingUser) {
      await User.create({
        nombre: 'jonatan',
        correo: 'jonatan@example.com',
        contrasena: '12345',
        apellido: 'perez',  
          })
    }
  }
}