const express = require("express");
const { sequelize, Chekouts } = require("../models");
const path = require("path");
const {Op} = require("sequelize");
const {checkoutSchema} = require("../schemas/checkout-schema");
const route = express.Router();
route.use(express.static(path.join(__dirname, 'static')));

module.exports = route;

route.get("/", async (req, res) => {
    try{
        const allCheckouts = await Chekouts.findAll();
        return res.json(allCheckouts);
    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

route.delete("/obrisi/:id", async (req, res) => {
    try{
        const checkouts = await Chekouts.findByPk(req.params.id);
        checkouts.destroy();
        return res.json(checkouts.id);
    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

route.get("/id/:id",  async (req,res) => {
    try{
        const object = await Chekouts.findByPk(req.params.id);
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
        const objects = await Chekouts.findAll({
            where:{
                [Op.or]: [{
                    start_time: {
                        [Op.substring]: req.params.q
                    },
                },
                    {
                        end_time: {
                            [Op.substring]: req.params.q
                        },
                    },
                    {
                        book_copy_id: {
                            [Op.substring]: req.params.q
                        },
                    },
                    {
                        patron_id: {
                            [Op.substring]: req.params.q
                        },
                    },
                    {
                        is_returned: {
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
        let checkCheckouts = {
            start_time: req.body.start_time,
            end_time: req.body.end_time,
            book_copy_id: req.body.book_copy_id,
            patron_id: req.body.patron_id,
            is_returned: req.body.is_returned,
        }
        const validate = checkoutSchema.validate(checkCheckouts);
        if(validate.error){
            res.status(400).json(validate.error);
            return;
        }

        let checkouts = await Chekouts.findByPk( req.body.id );
        checkouts.start_time = req.body.start_time;
        checkouts.end_time = req.body.end_time;
        checkouts.book_copy_id = req.body.book_copy_id;
        checkouts.patron_id = req.body.patron_id;
        checkouts.is_returned = req.body.is_returned;
        await checkouts.save();
        res.send(checkouts);

    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
})

route.post("/dodaj", async (req, res) => {
    try{
        let checkCheckouts = {
            start_time: req.body.start_time,
            end_time: req.body.end_time,
            book_copy_id: req.body.book_copy_id,
            patron_id: req.body.patron_id,
            is_returned: req.body.is_returned,
        }
        const validate = checkoutSchema.validate(checkCheckouts);
        if(validate.error){
            res.status(400).json(validate.error);
            return;
        }

        const noviCheckouts = await Chekouts.create(req.body);
        return res.json(noviCheckouts);
    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});
