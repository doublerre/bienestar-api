import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Subcommittee from './subcommittee.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Dependency extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare subcommitteeId: number

  @belongsTo(() => Subcommittee)
  declare subcommittee: BelongsTo<typeof Subcommittee>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}