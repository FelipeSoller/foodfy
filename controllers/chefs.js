const fs = require('fs');
const data = require('../data.json');

exports.index = function(req, res) {
    return res.render("admin/chefs/chefsList", { chefs: data.chefs })
}

exports.create = function(req, res) {
    return res.render("admin/chefs/create")
}

exports.post = function(req, res) {
    const keys = Object.keys(req.body);

    for (key of keys) {
       if (req.body[key] == "") {
           return res.send("Please, fill all fields!")
       }
    }

    let {id, image, ingredients, preparation, information} = req.body;

    id = Number(data.chefs.length + 1);    

    data.chefs.push({
        id, 
        name, 
        avatar_url, 
        created_at
    });

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if (err) {
            return res.send("Write file error!")
        }

        return res.redirect("/admin/chefs");
    });
}

exports.show = function(req, res) {
    const { id } = req.params;

    const foundChef = data.chefs.find(function(chef) {
        return chef.id == id
    });

    if (!foundChef) {
        return res.send("Chef not found!");
    }

    return res.render("admin/chefs/show", { chef: foundChef, items: data.recipes });
}

exports.edit = function(req, res) {
    const { id } = req.params;

    const foundChef = data.chefs.find(function(chef) {
        return id == chef.id;
    });
    
    if (!foundChef) {
        return res.send("Chef not found!");
    }

    return res.render("admin/chefs/edit", { chef: foundChef });
}

exports.put = function(req, res) {
    const { id } = req.body;
    let index = 0

    const foundChef = data.chefs.find(function(chef, foundIndex) {
        if (id == chef.id) {
            index = foundIndex
            return true
        }
    });

    if (!foundChef) {
        return res.send("Chef not found!");
    }

    const chef = {
        ...foundChef,
        ...req.body,
        id: Number(req.body.id)        
    }

    data.chefs[index] = chef;

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if (err) {
            return res.send("Write file error!")
        }

        return res.redirect(`/admin/chefs/${id}`)
    });
}

exports.delete = function(req, res) {
    const { id } = req.body;

    const filteredChefs = data.chefs.filter(function(chef) {
        return chef.id != id;
    });

    data.chefs = filteredChefs;

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if (err) {
            return res.send("Write file error!");
        }

        return res.redirect("/admin/chefs");
    });
}