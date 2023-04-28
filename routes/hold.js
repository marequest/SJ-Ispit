const express = require("express");
const { sequelize, Holds } = require("../models");
const path = require("path");
const {Op} = require("sequelize");
const {holdSchema} = require("../schemas/hold-schema");
const route = express.Router();
route.use(express.static(path.join(__dirname, 'static')));

module.exports = route;

route.get("/", async (req, res) => {
    try{
        const allHolds = await Holds.findAll();
        return res.json(allHolds);
    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

route.delete("/obrisi/:id", async (req, res) => {
    try{
        const holds = await Holds.findByPk(req.params.id);
        holds.destroy();
        return res.json(holds.id);
    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

route.get("/id/:id",  async (req,res) => {
    try{
        const object = await Holds.findByPk(req.params.id);
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
        const objects = await Holds.findAll({
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
                        book_id: {
                            [Op.substring]: req.params.q
                        },
                    },
                    {
                        patron_id: {
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
        let checkHolds = {
            start_time: req.body.start_time,
            end_time: req.body.end_time,
            book_id: req.body.book_id,
            patron_id: req.body.patron_id
        }
        const validate = holdSchema.validate(checkHolds);
        if(validate.error){
            res.status(400).json(validate.error);
            return;
        }

        let holds = await Holds.findByPk( req.body.id );
        holds.start_time = req.body.start_time;
        holds.end_time = req.body.end_time;
        holds.book_id = req.body.book_id;
        holds.patron_id = req.body.patron_id;
        await holds.save();
        res.send(holds);

    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
})

route.post("/dodaj", async (req, res) => {
    try{
        let checkHolds = {
            start_time: req.body.start_time,
            end_time: req.body.end_time,
            book_id: req.body.book_copy_id,
            patron_id: req.body.patron_id
        }
        const validate = holdSchema.validate(checkHolds);
        if(validate.error){
            res.status(400).json(validate.error);
            return;
        }

        const noviHolds = await Holds.create(req.body);
        return res.json(noviHolds);
    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});
