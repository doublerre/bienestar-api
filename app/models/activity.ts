import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import MeasurementUnit from './measurement_unit.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Dependency from './dependency.js'
import Subcommittee from './subcommittee.js'

export default class Activity extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare finalGoal: number

  @column()
  declare startDate: DateTime | null

  @column()
  declare endDate: DateTime | null

  @column()
  declare population: number

  @column()
  declare narrative: string | null

  @column()
  declare investment: number

  @column()
  declare justification: string | null

  @column()
  declare measurementUnitId: number

  @column()
  declare dependencyId: number

  @column()
  declare subcommitteeId: number

  @belongsTo(() => MeasurementUnit)
  declare measurementUnit: BelongsTo<typeof MeasurementUnit>

  @belongsTo(() => Dependency)
  declare dependency: BelongsTo<typeof Dependency>

  @belongsTo(() => Subcommittee)
  declare subcommittee: BelongsTo<typeof Subcommittee>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}