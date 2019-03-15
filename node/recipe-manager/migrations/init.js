exports.up = function (knex) {
    return knex.schema
        .createTable('recipes', function (table) {
        // table.uuid('id').unique().primary().notNullable()
        table.increments();
        table.string('name').notNullable()
        table.text('description').defaultTo('')
        table.text('ingredients').defaultTo('')
        table.integer('difficulty').notNullable().defaultTo(0)
        table.integer('time_taken').notNullable().defaultTo(10)
        table.timestamps(true, true)
    })
}

exports.down = function (knex) {
    return knex.schema
    .dropTableIfExists('recipes')
}