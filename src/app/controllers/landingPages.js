const LandingPage = require('../models/landingPage');

module.exports = {
    index(req, res) {
        
         LandingPage.all(function (recipes) {
            return res.render("landing/index", { recipes });
         });     
    },
    about(req, res) {
        return res.render("landing/about");
    },
    recipeList(req, res) {

        LandingPage.all(function (recipes) {
            return res.render("landing/recipes", { recipes });
         }); 
    },
    show(req, res) {
        LandingPage.find(req.params.id, function (recipe) {
            if(!recipe) return res.send("Recipe not found!");           

            return res.render("landing/recipe", { recipe })
        });
    }
}