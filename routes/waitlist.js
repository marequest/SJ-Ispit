const express = require("express");
const { sequelize, Waitlists } = require("../models");
const path = require("path");
const {Op} = require("sequelize");
const {waitlistSchema} = require("../schemas/waitlist-schema");

const route = express.Router();
route.use(express.static(path.join(__dirname, 'static')));

module.exports = route;

route.get("/", async (req, res) => {
    try{
        const allWaitlists = await Waitlists.findAll();
        return res.json(allWaitlists);
    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

route.delete("/obrisi/:id", async (req, res) => {
    try{
        const waitlists = await Waitlists.findByPk(req.params.id);
        waitlists.destroy();
        return res.json(waitlists.id);
    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

route.get("/id/:id",  async (req,res) => {
    try{
        const object = await Waitlists.findByPk(req.params.id);
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
        const objects = await Waitlists.findAll({
            where:{
                [Op.or]: [
                    {
                        book_id: {
                            [Op.substring]: req.params.q
                        },
                    },
                    {
                        patron_id: {
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
        let checkWaitlists = {
            book_id: req.body.book_id,
            patron_id: req.body.patron_id
        }
        const validate = waitlistSchema.validate(checkWaitlists);
        if(validate.error){
            res.status(400).json(validate.error);
            return;
        }

        let waitlists = await Waitlists.findByPk( req.body.id );
        waitlists.book_id = req.body.book_id;
        waitlists.patron_id = req.body.patron_id;
        await waitlists.save();
        res.send(waitlists);

    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
})

route.post("/dodaj", async (req, res) => {
    try{
        let checkWaitlists = {
            book_id: req.body.book_id,
            patron_id: req.body.patron_id
        }
        const validate = waitlistSchema.validate(checkWaitlists);
        if(validate.error){
            res.status(400).json(validate.error);
            return;
        }

        const noviWaitlists = await Waitlists.create(req.body);
        return res.json(noviWaitlists);
    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});
