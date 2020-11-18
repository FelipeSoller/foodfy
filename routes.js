const express = require('express');
const routes = express.Router();
const data = require('./data.json');
const recipes = require('./controllers/recipes');

// FOODFY ROUTES
routes.get("/", function(req, res) {
    return res.render("landing/index", { items: data.recipes })
})

routes.get("/sobre", function(req, res) {
    return res.render("about/index")
})

routes.get("/receitas", function(req, res) {
    return res.render("recipes/index", { items: data.recipes })
})

routes.get("/receitas/:index", (req, res) => {
    const recipeIndex = req.params.index 
    const recipe = [...data.recipes]    
    
    return res.render('recipes/recipe', { recipe: recipe[recipeIndex - 1] })
})

// ADMIN ROUTES
routes.get("/admin/recipes", recipes.index)

routes.get("/admin/recipes/create", recipes.create)

routes.post("/admin/recipes", recipes.post)

routes.get("/admin/recipes/:id", recipes.show)

routes.get("/admin/recipes/:id/edit", recipes.edit)

routes.put("/admin/recipes", recipes.put)

routes.delete("/admin/recipes", recipes.delete)

module.exports = routes;