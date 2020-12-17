const express = require('express');
const routes = express.Router();
const recipes = require('./app/controllers/recipes');
const chefs = require('./app/controllers/chefs');

// LANDING ROUTES
routes.get("/", function(req, res) {
    return res.render("landing/index", { items: data.recipes });
});

routes.get("/sobre", function(req, res) {
    return res.render("landing/about");
});

routes.get("/receitas", function(req, res) {
    return res.render("landing/recipes", { items: data.recipes });
});

routes.get("/receitas/:index", (req, res) => {
    const recipeIndex = req.params.index;
    const recipe = [...data.recipes];
    
    return res.render('landing/recipe', { recipe: recipe[recipeIndex - 1] });
});

// ADMINS ROUTES
routes.get("/admin/recipes", recipes.index)
routes.get("/admin/recipes/create", recipes.create)
routes.post("/admin/recipes", recipes.post)
routes.get("/admin/recipes/:id", recipes.show)
routes.get("/admin/recipes/:id/edit", recipes.edit)
routes.put("/admin/recipes", recipes.put)
routes.delete("/admin/recipes", recipes.delete)

// CHEFS ROUTES
routes.get("/admin/chefs", chefs.index)
routes.get("/admin/chefs/create", chefs.create)
routes.post("/admin/chefs", chefs.post)
routes.get("/admin/chefs/:id", chefs.show)
routes.get("/admin/chefs/:id/edit", chefs.edit)
routes.put("/admin/chefs", chefs.put)
routes.delete("/admin/chefs", chefs.delete)

module.exports = routes;