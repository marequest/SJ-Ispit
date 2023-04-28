const express = require("express");
const { sequelize, Books } = require("../models");
const path = require("path");
const {bookSchema} = require("../schemas/book-schema");
const route = express.Router();
route.use(express.static(path.join(__dirname, 'static')));

module.exports = route;

route.get("/", async (req, res) => {
    try{
        const allBooks = await Books.findAll();
        return res.json(allBooks);
    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

route.delete("/obrisi/:id", async (req, res) => {
    try{
        const book = await Books.findByPk(req.params.id);
        book.destroy();
        return res.json(book.id);
    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

route.get("/id/:id",  async (req,res) => {
    try{
        const object = await Books.findByPk(req.params.id);
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
        const objects = await Books.findAll({
            where:{
                title: {
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
        let book = await Books.findByPk( req.body.id );

        let checkBook = {
            title: req.body.title,
        }
        const validate = bookSchema.validate(checkBook);
        if(validate.error){
            res.status(400).json(validate.error);
            return;
        }

        book.title = req.body.title;
        await book.save();
        res.send(book);

    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
})

route.post("/dodaj", async (req, res) => {
    try{
        let checkBook = {
            title: req.body.title,
        }
        const validate = bookSchema.validate(checkBook);
        if(validate.error){
            res.status(400).json(validate.error);
            return;
        }

        const noviBook = await Books.create(req.body);

        return res.json(noviBook);
    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});
