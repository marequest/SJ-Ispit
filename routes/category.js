const express = require("express");
const { sequelize, Categories } = require("../models");
const path = require("path");
const {Op} = require("sequelize");
const {categorySchema} = require("../schemas/category-schema");
const route = express.Router();
route.use(express.static(path.join(__dirname, 'static')));
module.exports = route;

route.get("/", async (req, res) => {
    try{
        const allCategories = await Categories.findAll();
        return res.json(allCategories);
    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

route.delete("/obrisi/:id", async (req, res) => {
    try{
        const categories = await Categories.findByPk(req.params.id);
        categories.destroy();
        return res.json(categories.id);
    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

route.get("/id/:id",  async (req,res) => {
    try{
        const object = await Categories.findByPk(req.params.id);
        return res.json(object);
    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

route.get("/:q", async (req,res) => {
    try{
        //select * from tasks where naziv like '%:q%'
        const { Op } = require("sequelize");
        const objects = await Categories.findAll({
            where:{
                name: {
                    [Op.substring]: req.params.q
                }
            }
        });
        return res.json(objects);
    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

route.put("/:id", async (req, res) => {
    try{
        let checkCategory = {
            name: req.body.name,

        }
        const validate = categorySchema.validate(checkCategory);
        if(validate.error){
            res.status(400).json(validate.error);
            return;
        }

        let categories = await Categories.findByPk( req.body.id );
        categories.name = req.body.name;
        await categories.save();
        res.send(categories);

    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
})

route.post("/dodaj", async (req, res) => {
    try{
        let checkCategory = {
            name: req.body.name,

        }
        const validate = categorySchema.validate(checkCategory);
        if(validate.error){
            res.status(400).json(validate.error);
            return;
        }

        const noviCategories = await Categories.create(req.body);
        return res.json(noviCategories);
    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});
