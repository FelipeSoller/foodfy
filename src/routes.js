const express = require('express');
const routes = express.Router();
const recipes = require('./app/controllers/recipes');
const chefs = require('./app/controllers/chefs');
const landingPages = require('./app/controllers/landingPages');

// LANDING ROUTES
routes.get("/", landingPages.index);
routes.get("/sobre", landingPages.about);
routes.get("/receitas", landingPages.recipeList);
routes.get("/receitas/:id", landingPages.show);

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