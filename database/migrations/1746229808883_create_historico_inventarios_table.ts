import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'historico_inventarios'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('codigo').notNullable()
      table.integer('productos_id').notNullable().unsigned().references('id').inTable('productos').onDelete('CASCADE') // Cambiado a integer
      table.integer('categorias_id').notNullable().unsigned().references('id').inTable('categorias').onDelete('CASCADE') // Cambiado a integer
      table.integer('stock').notNullable()
      table.integer('min_stock').notNullable()
      table.string('u_m').nullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}