const Recipe = require('../models/recipe');

module.exports = {
    async index(req, res) {
        
        const results = await Recipe.all()
        const recipes = results.rows

        return res.render("admin/recipes/recipesList", { recipes });                  
    },
    async create(req, res) {
        const results = await  Recipe.chefsSelectOptions()
        const options = results.rows

        return res.render("admin/recipes/create", { chefOptions: options });                
    },
    async post(req, res) {        
        const keys = Object.keys(req.body);

        for (key of keys) {
            if (req.body[key] == "") {
                return res.send("Please, fill all fields!");
            }
        }

        let results = await Recipe.create(req.body)
        const recipe = results.rows[0].id
        
        return res.redirect(`/admin/recipes/${recipe}`);        
    },
    async show(req, res) {
        let results = await Recipe.find(req.params.id)
        const recipe = results.rows[0]

        return res.render("admin/recipes/show", { recipe });        
    },
    async edit(req, res) {
        let results = await Recipe.find(req.params.id)
        const recipe = results.rows[0]

        if(!recipe) return res.send("Recipe not found!");

        results = await  Recipe.chefsSelectOptions()
        const options = results.rows

        return res.render("admin/recipes/edit", { recipe, chefOptions: options });        
    },
    async put(req, res) {
        const keys = Object.keys(req.body);

        for (key of keys) {
            if (req.body[key] == "") {
                return res.send("Please, fill all fields!");
            }
        }

        await Recipe.update(req.body)        
        
        return res.redirect(`/admin/recipes/${req.body.id}`); 
        
    },
    async delete(req, res) {
        await Recipe.delete(req.body.id)
        return res.redirect(`/admin/recipes/`)
    }
}