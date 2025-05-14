import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'factura_compra_detalles'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('encabezado_factura_compra').notNullable().unsigned().references('id').inTable('factura_compras').onDelete('CASCADE')
      table.integer('proveedor_id').notNullable().unsigned().references('id').inTable('proveedors').onDelete('CASCADE')
      table.integer('producto_id').notNullable().unsigned().references('id').inTable('productos').onDelete('CASCADE')
      table.integer('cantidad').notNullable()
      table.integer('precio').notNullable()
      table.integer('subtotal').notNullable 
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}