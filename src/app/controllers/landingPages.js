const LandingPage = require('../models/landingPage');

module.exports = {
    index(req, res) {
        const { filter } = req.query;

        if(filter) {
            LandingPage.findBy(filter, function(recipes) {
                return res.render("landing/index", { recipes, filter });
            })
        } else {
            LandingPage.allRecipes(function (recipes) {
               return res.render("landing/index", { recipes });
            });
        }
        
    },
    about(req, res) {
        return res.render("landing/about");
    },
    recipeList(req, res) {
        let { filter, page, limit } = req.query;

        page = page || 1
        limit = limit || 6
        let offset = limit * (page - 1)

        const params = {
            filter,
            page,
            limit,
            offset,
            callback(recipes) {

                const pagination = {                     
                    total: Math.ceil(recipes[0].total / limit), 
                    page
                }
                return res.render("landing/recipes", { recipes, pagination, filter });
            }
        }

        LandingPage.paginate(params);        
    },
    chefList(req, res) {

        LandingPage.allChefs(function (chefs) {
            return res.render("landing/chefs", { chefs });
         }); 
    },
    show(req, res) {
        LandingPage.find(req.params.id, function (recipe) {
            if(!recipe) return res.send("Recipe not found!");           

            return res.render("landing/recipe", { recipe })
        });
    }
}