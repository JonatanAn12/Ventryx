import type { HttpContext } from '@adonisjs/core/http'
import Historico from '#models/Historico'

export default class InventoryController {
  //* Crear un nuevo registro
  public async create({ request, response }: HttpContext) {
    try {
      const requestData = request.only(['codigo', 'producto', 'categoria', 'stock', 'min_stock', 'u_m'])
      const data = {
        codigo: requestData.codigo,
        producto: requestData.producto,
        categoria: requestData.categoria,
        stock: requestData.stock,
        min_stock: requestData.min_stock,
        u_m: requestData.u_m,
      }
      const nuevoRegistro = await Historico.create(data)
      return response.status(201).json(nuevoRegistro)
    } catch (error) {
      return response.status(500).json({ error: 'Error al  crear el registro' })
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
      console.log('ID recibido para actualizar:', params.id); // Depuración
      const registro = await Historico.find(params.id);
      if (!registro) {
        return response.status(404).json({ error: 'Registro no encontrado' });
      }
  
      const requestData = request.only(['codigo', 'nombre_producto', 'categoria', 'stock', 'min_stock', 'u_m']);
      registro.merge(requestData);
      await registro.save();
      return response.status(200).json(registro);
    } catch (error) {
      console.error('Error al actualizar el registro:', error);
      return response.status(500).json({ error: 'Error al actualizar el registro' });
    }
  }

  //* Eliminar un registro por código
  public async destroy({ params, response }: HttpContext) {
    try {
      console.log('ID recibido para eliminar:', params.id); // Depuración
      if (!params.id) {
        return response.status(400).json({ error: 'ID no proporcionado' });
      }
  
      const producto = await Historico.findOrFail(params.id); // Buscar el producto por ID
      console.log('Producto encontrado:', producto); // Depuración
      await producto.delete(); // Eliminar el producto
      return response.status(200).json({ message: 'Producto eliminado exitosamente' });
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
      return response.status(400).json({ error: 'Error al eliminar el producto' });
    }
  }
}