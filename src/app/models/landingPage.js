const db = require('../../config/db');

module.exports = {
    allRecipes(callback) {

        db.query(`
            SELECT recipes.*, chefs.name AS chef_name
            FROM recipes 
            LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
            LIMIT 6
        `, function (err, results) {
            if (err) throw `Database Error  ${err}`

            callback(results.rows);
        });
    },
    allChefs(callback) {

        db.query(`
            SELECT chefs.*, count(recipes) AS total_recipes
            FROM chefs
            LEFT JOIN recipes ON (recipes.chef_id = chefs.id)
            GROUP BY chefs.id
            ORDER BY name ASC
        `, function (err, results) {
            if (err) throw `Database Error  ${err}`

            callback(results.rows);
        });
    },
    find(id, callback) {

        db.query(`
            SELECT recipes.*, chefs.name AS chef_name
            FROM recipes 
            LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
            WHERE recipes.id = $1
        `, [id], function (err, results) {
            if (err) throw `Database Error  ${err}`

            callback(results.rows[0]);
        });
    },
    findBy(filter, callback) {
        db.query(`
            SELECT recipes.*, chefs.name AS chef_name 
            FROM recipes
            LEFT JOIN chefs ON (chefs.id = recipes.chef_id)
            WHERE recipes.title ILIKE '%${filter}%'
            OR chefs.name ILIKE '%${filter}%'
            ORDER BY recipes.title ASC           
        `, function (err, results) {
            if (err) throw `Database Error  ${err}`

            callback(results.rows);
        });
    },
    paginate(params) {
        const {
            filter,
            limit,
            offset,
            callback
        } = params

        let query = "",
            filterQuery = "",
            totalQuery = `(
                SELECT count(*) FROM recipes
            ) AS total`

        if (filter) {
            filterQuery = `
            WHERE recipes.title ILIKE '%${filter}%'
            OR chefs.name ILIKE '%${filter}%'
            `

            totalQuery = `(
                SELECT count(*) FROM recipes
                ${filterQuery}
            ) AS total`
        }

        query = `
            SELECT recipes.*, ${totalQuery}, chefs.name AS chef_name
            FROM recipes
            LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
            ${filterQuery}
            ORDER BY recipes.title ASC LIMIT $1 OFFSET $2
            `
        db.query(query, [limit, offset], function (err, results) {
            if (err) throw `Database Error! ${err}`

            callback(results.rows)
        });

    }
}