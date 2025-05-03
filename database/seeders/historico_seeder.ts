import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Historico from '#models/Historico'

export default class extends BaseSeeder {
  async run() {
    const historico = await Historico.create({
      codigo: 1,
      nombre_producto: 'Producto 1',
      categoria: 'Categoria 1',
      stock: 100,
      min_stock: 10,
      u_m: 'Unidad',
        })
      }
  }
