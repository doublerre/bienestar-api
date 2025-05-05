import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'activities'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.text('name').notNullable()
      table.double('final_goal').notNullable();
      table.date('start_date').nullable()
      table.date('end_date').nullable()
      table.bigInteger('population').notNullable()
      table.text('narrative').nullable()
      table.double('budget').notNullable()
      table.text('justification').nullable()
      table.integer('measurement_unit_id').unsigned().notNullable()
      table.integer('dependency_id').unsigned().notNullable()
      table.integer('subcommittee_id').unsigned().notNullable()

      table.foreign('measurement_unit_id').references('id').inTable('measurement_units').onDelete('CASCADE').onUpdate('CASCADE')
      table.foreign('dependency_id').references('id').inTable('dependencies').onDelete('CASCADE').onUpdate('CASCADE')
      table.foreign('subcommittee_id').references('id').inTable('subcommittees').onDelete('CASCADE').onUpdate('CASCADE')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}