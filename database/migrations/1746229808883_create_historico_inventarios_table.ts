import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'historico_inventarios'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('codigo').notNullable() // Cambiado a snake_case
      table.string('producto').notNullable()
      table.string('categoria').notNullable() // Cambiado a snake_case
      table.integer('stock').notNullable() // Cambiado a snake_case
      table.integer('min_stock').notNullable() // Cambiado a snake_case
      table.string('u_m') // Cambiado a snake_case
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}