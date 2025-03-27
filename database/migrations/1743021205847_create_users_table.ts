import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.string('full_name').nullable()
      table.string('email', 254).notNullable().unique()
      table.string('username', 50).notNullable().unique()
      table.string('password').notNullable()
      table.enum("role", ["ROLE_ADMIN", "ROLE_SUBCOMITE", "ROLE_ENLACES"]).notNullable()
      table.boolean("isActive").notNullable().defaultTo(true);

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()

      //TODO: Relacion al modelo de dependencias
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}