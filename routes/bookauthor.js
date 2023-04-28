const express = require("express");
const { sequelize, BookAuthors } = require("../models");
const path = require("path");
const {Op} = require("sequelize");
const {bookAuthorSchema} = require("../schemas/bookauthor-schema");
const route = express.Router();
route.use(express.static(path.join(__dirname, 'static')));

module.exports = route;

route.get("/", async (req, res) => {
    try{
        const allBookAuthors = await BookAuthors.findAll();
        return res.json(allBookAuthors);
    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

route.delete("/obrisi/:id", async (req, res) => {
    try{
        const bookauthors = await BookAuthors.findByPk(req.params.id);
        bookauthors.destroy();
        return res.json(bookauthors.id);
    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

route.get("/id/:id",  async (req,res) => {
    try{
        const object = await BookAuthors.findByPk(req.params.id);
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
        const objects = await BookAuthors.findAll({
            where:{
                [Op.or]: [
                    {
                        book_id: {
                            [Op.substring]: req.params.q
                        },
                    },
                    {
                        author_id: {
                            [Op.substring]: req.params.q
                        },
                    },
                ]
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
        let checkBookAuthor = {
            book_id: req.body.book_id,
            author_id: req.body.author_id
        }
        const validate = bookAuthorSchema.validate(checkBookAuthor);
        if(validate.error){
            res.status(400).json(validate.error);
            return;
        }

        let bookauthors = await BookAuthors.findByPk( req.body.id );
        bookauthors.book_id = req.body.book_id;
        bookauthors.author_id = req.body.author_id;
        await bookauthors.save();
        res.send(bookauthors);

    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
})

route.post("/dodaj", async (req, res) => {
    try{
        let checkBookAuthor = {
            book_id: req.body.book_id,
            author_id: req.body.author_id
        }
        const validate = bookAuthorSchema.validate(checkBookAuthor);
        if(validate.error){
            res.status(400).json(validate.error);
            return;
        }

        const noviBookAuthors = await BookAuthors.create(req.body);
        return res.json(noviBookAuthors);
    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});
