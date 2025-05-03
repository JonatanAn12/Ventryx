import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Historico extends BaseModel {
  public static table = 'historico_inventarios'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare codigo: number
  @column()
  declare nombre_producto: string 
  @column()
  declare categoria: string
  @column()
  declare stock: number
  @column()
  declare min_stock: number
  @column()
  declare u_m: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}