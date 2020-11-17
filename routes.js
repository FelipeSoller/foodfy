const express = require('express');
const routes = express.Router();
const recipes = require('./data')

routes.get("/", function(req, res) {
    return res.render("landing/index", { items: recipes })
})


routes.get("/sobre", function(req, res) {
    return res.render("about/index")
})

routes.get("/receitas", function(req, res) {
    return res.render("recipes/index", { items: recipes })
})

routes.get("/receitas/:index", (req, res) => {
    const recipeIndex = req.params.index 
    const recipe = [...recipes]    
    
    return res.render('recipes/recipe', { recipe: recipe[recipeIndex - 1] })
})

module.exports = routes;