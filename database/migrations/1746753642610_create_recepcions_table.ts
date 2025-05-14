import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'recepcions'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('producto_id').notNullable().unsigned().references('id').inTable('productos').onDelete('CASCADE')
      table.integer('cantidad').notNullable()
      table.integer('peso').notNullable()
      table.string('devolucion').notNullable()
      table.integer('proveedor_id').notNullable().unsigned().references('id').inTable('proveedors').onDelete('CASCADE')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}