import type { HttpContext } from '@adonisjs/core/http'
import Historico from '#models/Historico'

export default class InventoryController {
  //* Crear un nuevo registro
  public async create({ request, response }: HttpContext) {
    try {
      const requestData = request.only(['codigo', 'nombre_producto', 'categoria', 'stock', 'min_stock', 'u_m'])
      const data = {
        codigo: requestData.codigo,
        nombre_producto: requestData.nombre_producto,
        categoria: requestData.categoria,
        stock: requestData.stock,
        min_stock: requestData.min_stock,
        u_m: requestData.u_m,
      }
      const nuevoRegistro = await Historico.create(data)
      return response.status(201).json(nuevoRegistro)
    } catch (error) {
      return response.status(500).json({ error: 'Error al crear el registro' })
    }
  }

  //* Obtener todos los registros
  public async index({ response }: HttpContext) {
    try {
      const productos = await Historico.all()
      return response.status(200).json(productos)
    } catch (error) {
      console.error('Error al obtener los productos:', error)
      return response.status(500).json({ error: 'Error al obtener los productos' })
    }
  }

  //* Obtener registro específico por id
  public async show({ params, response }: HttpContext) {
    try {
      const registro = await Historico.find(params.id)
      if (!registro) {
        return response.status(404).json({ error: 'Registro no encontrado' })
      }
      return response.status(200).json(registro)
    } catch (error) {
      return response.status(500).json({ error: 'Error al obtener el registro' })
    }
  }

  //* Actualizar registro existente
  public async update({ params, request, response }: HttpContext) {
    try {
      const registro = await Historico.find(params.id)
      if (!registro) {
        return response.status(404).json({ error: 'Registro no encontrado' })
      }
      const requestData = request.only(['codigo', 'nombre_producto', 'categoria', 'stock', 'min_stock', 'u_m'])
      registro.merge(requestData)
      await registro.save()
      return response.status(200).json(registro)
    } catch (error) {
      return response.status(500).json({ error: 'Error al actualizar el registro' })
    }
  }

  //* Eliminar un registro por código
  public async delete({ params, response }: HttpContext) {
    try {
      // Obtener el código desde los parámetros
      const codigo = params.codigo

      // Validar que el código sea un número
      if (isNaN(Number(codigo))) {
        return response.status(400).json({ error: 'Código inválido' })
      }

      // Buscar el registro por código
      const registro = await Historico.findBy('codigo', codigo)
      if (!registro) {
        return response.status(404).json({ error: 'Registro no encontrado' })
      }

      // Eliminar el registro
      await registro.delete()
      return response.status(200).json({ message: 'Registro eliminado correctamente' })
    } catch (error) {
      console.error('Error al eliminar el registro:', error)
      return response.status(500).json({ error: 'Error al eliminar el registro' })
    }
  }
}