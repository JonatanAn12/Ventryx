import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'factura_venta_detalles'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('factura_venta_id').notNullable().notNullable()
      table.string('cantidad').notNullable()
      table.integer('producto_id').notNullable()
      table.string('descripcion').notNullable()
      table.integer('precio_unitario').notNullable()
      table.string('descuento').notNullable()
      table.string('iva').notNullable()
      table.integer('subtotal').notNullable()
      table.integer('total').notNullable()
      table.integer('metodo_pago_id').notNullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}