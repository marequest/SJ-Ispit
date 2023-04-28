const express = require("express");
const { sequelize, Patrons } = require("../models");
const path = require("path");
const {Op} = require("sequelize");
const {patronSchema} = require("../schemas/patron-schema");
const route = express.Router();
route.use(express.static(path.join(__dirname, 'static')));

module.exports = route;

route.get("/", async (req, res) => {
    try{
        const allPatrons = await Patrons.findAll();
        return res.json(allPatrons);
    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

route.delete("/obrisi/:id", async (req, res) => {
    try{
        const patron = await Patrons.findByPk(req.params.id);
        patron.destroy();
        return res.json(patron.id);
    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

route.get("/id/:id",  async (req,res) => {
    try{
        const object = await Patrons.findByPk(req.params.id);
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
        const objects = await Patrons.findAll({
            where:{
                [Op.or]: [{
                        first_name: {
                            [Op.substring]: req.params.q
                        },
                    },
                    {
                        surname: {
                            [Op.substring]: req.params.q
                        },
                    },
                    {
                        email: {
                            [Op.substring]: req.params.q
                        },
                    },
                    {
                        status: {
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
        let checkPatrons = {
            first_name: req.body.first_name,
            surname: req.body.surname,
            email: req.body.email,
            status: req.body.status
        }
        const validate = patronSchema.validate(checkPatrons);
        if(validate.error){
            res.status(400).json(validate.error);
            return;
        }

        let patron = await Patrons.findByPk( req.body.id );
        patron.first_name = req.body.first_name;
        patron.surname = req.body.surname;
        patron.email = req.body.email;
        patron.status = req.body.status;
        await patron.save();
        res.send(patron);

    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
})

route.post("/dodaj", async (req, res) => {
    try{
        let checkPatrons = {
            first_name: req.body.first_name,
            surname: req.body.surname,
            email: req.body.email,
            status: req.body.status
        }
        const validate = patronSchema.validate(checkPatrons);
        if(validate.error){
            res.status(400).json(validate.error);
            return;
        }

        const noviPatrons = await Patrons.create(req.body);
        return res.json(noviPatrons);
    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});
