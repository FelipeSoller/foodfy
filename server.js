const express = require('express')
const nunjucks = require('nunjucks')

const server = express()
const recipes = require('./data')

server.use(express.static('public'))

server.set("view engine", "njk")

nunjucks.configure("views", {
    express:server,
    noCache: true
})

server.get("/", function(req, res) {
    return res.render("home", { items: recipes })
})


server.get("/sobre", function(req, res) {
    return res.render("sobre")
})

server.get("/receitas", function(req, res) {
    return res.render("receitas", { items: recipes })
})

server.get("/receitas/:index", (req, res) => {
    const recipeIndex = req.params.index 
    const recipe = [...recipes]
    
    // console.log(recipeIndex)
    // console.log(recipe)
    // console.log(recipe[recipeIndex])
    return res.render('receita', { recipe: recipe[recipeIndex - 1] })
})

server.listen(5000, function() {
    console.log("server is running");    
})