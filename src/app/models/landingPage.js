const db = require('../../config/db');

module.exports = {
    all(callback) {

        db.query(`
            SELECT recipes.*, chefs.name AS chef_name
            FROM recipes 
            LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
            ORDER BY title ASC
        `, function(err, results) {
            if(err) throw `Database Error  ${err}`

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
            if(err) throw `Database Error  ${err}`

            callback(results.rows[0]);
        });
    }   
}