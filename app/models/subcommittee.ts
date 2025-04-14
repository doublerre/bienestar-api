import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import YearName from './year_name.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Subcommittee extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare yearNameId: number

  @belongsTo(() => YearName)
  declare yearName: BelongsTo<typeof YearName>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}