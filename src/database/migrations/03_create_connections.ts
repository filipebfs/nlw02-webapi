import Knex from 'knex';

export function up(knex: Knex)
{
   return knex.schema
      .createTable(
         'connections', 
         table =>
         {
            table.increments('id').primary();

            table.timestamp('created_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));

            table.integer('user_id')
               .notNullable()
               .references('id')
               .inTable('users')
               .onDelete('CASCADE');
         }
      );
}

export function down(knex: Knex)
{
   return knex.schema.dropTable('connections');   
}
