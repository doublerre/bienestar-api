import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer("subcommittee_id").unsigned().nullable()
      table.integer("dependency_id").unsigned().nullable()

      table.foreign("subcommittee_id").references("id").inTable("subcommittees").onDelete("SET NULL").onUpdate("CASCADE")
      table.foreign("dependency_id").references("id").inTable("dependencies").onDelete("SET NULL").onUpdate("CASCADE")
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table)=> {
      table.dropForeign("subcommittee_id")
      table.dropForeign("dependency_id")

      table.dropColumn("subcommittee_id")
      table.dropColumn("dependency_id")
    })
  }
}