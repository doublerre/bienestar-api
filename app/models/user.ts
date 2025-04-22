import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import Subcommittee from './subcommittee.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Dependency from './dependency.js'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['username'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare fullName: string | null

  @column()
  declare email: string

  @column()
  declare username: string

  @column()
  declare role: string

  @column({ serializeAs: null })
  declare password: string

  @column()
  declare isActive: boolean

  @column()
  declare subcommitteeId: number | null

  @column()
  declare dependencyId: number | null

  @belongsTo(() => Subcommittee)
  declare subcommittee: BelongsTo<typeof Subcommittee>

  @belongsTo(() => Dependency)
  declare dependency: BelongsTo<typeof Dependency>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  static accessTokens = DbAccessTokensProvider.forModel(User)
}