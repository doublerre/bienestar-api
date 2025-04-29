import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import YearName from './year_name.js'
import type { BelongsTo, HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import Dependency from './dependency.js'
import User from './user.js'

export default class Subcommittee extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare yearNameId: number

  @belongsTo(() => YearName)
  declare yearName: BelongsTo<typeof YearName>

  @manyToMany(() => Dependency)
  declare dependency: ManyToMany<typeof Dependency>

  @hasMany(() => User)
  declare users: HasMany<typeof User>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}