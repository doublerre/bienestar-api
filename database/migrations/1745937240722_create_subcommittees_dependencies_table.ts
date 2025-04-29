import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'dependency_subcommittee'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('subcommittee_id').unsigned().notNullable()
      table.integer('dependency_id').unsigned().notNullable()

      table.foreign('subcommittee_id').references('id').inTable('subcommittees').onDelete('CASCADE').onUpdate('CASCADE')
      table.foreign('dependency_id').references('id').inTable('dependencies').onDelete('CASCADE').onUpdate('CASCADE')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}