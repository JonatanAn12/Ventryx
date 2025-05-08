import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, column } from '@adonisjs/lucid/orm'
import jwt from 'jsonwebtoken'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['correo'],
  passwordColumnName: 'contrasena',
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nombre: string | null

  @column()
  declare correo: string

  @column({ serializeAs: null })
  declare contrasena: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  static accessTokens = DbAccessTokensProvider.forModel(User)

  public async createToken(): Promise<{ token: string }> {
    const payload = { id: this.id, correo: this.correo }
    const secret = process.env.JWT_SECRET || 'default_secret'
    const token = jwt.sign(payload, secret, { expiresIn: '1h' }) // Cambiado a jwt.sign
    return { token }
  }
}
