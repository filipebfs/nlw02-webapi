import Knex from 'knex';

export function up(knex: Knex)
{
   return knex.schema
      .createTable(
         'class_schedules', 
         table =>
         {
            table.increments('id').primary();
            table.integer('week_day').notNullable();
            table.integer('from').notNullable();
            table.integer('to').notNullable();

            table.integer('class_id')
               .notNullable()
               .references('id')
               .inTable('classes')
               .onDelete('CASCADE');
         }
      );
}

export function down(knex: Knex)
{
   return knex.schema.dropTable('class_schedules');   
}
