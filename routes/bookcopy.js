const express = require("express");
const { sequelize, BookCopies } = require("../models");
const path = require("path");
const {Op} = require("sequelize");
const {bookAuthorSchema} = require("../schemas/bookauthor-schema");
const {bookCopySchema} = require("../schemas/bookcopy-schema");

const route = express.Router();
route.use(express.static(path.join(__dirname, 'static')));

module.exports = route;

// route.get("/pocetna", (req, res) => {
//     res.sendFile(path.join(__dirname, 'static', 'bookcopies.html'));
// });

route.get("/", async (req, res) => {
    try{
        const allBookCopies = await BookCopies.findAll();
        return res.json(allBookCopies);
    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

route.delete("/obrisi/:id", async (req, res) => {
    try{
        const bookcopies = await BookCopies.findByPk(req.params.id);
        bookcopies.destroy();
        return res.json(bookcopies.id);
    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

route.get("/id/:id",  async (req,res) => {
    try{
        const object = await BookCopies.findByPk(req.params.id);
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
        const objects = await BookCopies.findAll({
            where:{
                [Op.or]: [{
                    year_published: {
                        [Op.substring]: req.params.q
                    },
                },
                    {
                        book_id: {
                            [Op.substring]: req.params.q
                        },
                    },
                    {
                        publisher_id: {
                            [Op.substring]: req.params.q
                        },
                    }
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
        let checkBookCopy = {
            year_published: req.body.year_published,
            book_id: req.body.book_id,
            publisher_id: req.body.publisher_id,
        }
        const validate = bookCopySchema.validate(checkBookCopy);
        if(validate.error){
            res.status(400).json(validate.error);
            return;
        }

        let bookcopies = await BookCopies.findByPk( req.body.id );
        bookcopies.year_published = req.body.year_published;
        bookcopies.book_id = req.body.book_id;
        bookcopies.publisher_id = req.body.publisher_id;
        await bookcopies.save();
        res.send(bookcopies);

    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
})

route.post("/dodaj", async (req, res) => {
    try{
        let checkBookCopy = {
            year_published: req.body.year_published,
            book_id: req.body.book_id,
            publisher_id: req.body.publisher_id,
        }
        const validate = bookCopySchema.validate(checkBookCopy);
        if(validate.error){
            res.status(400).json(validate.error);
            return;
        }

        const noviBookCopies = await BookCopies.create(req.body);
        return res.json(noviBookCopies);
    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});
