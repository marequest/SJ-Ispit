const express = require("express");
const { sequelize, Users } = require("../models");
const path = require("path");
const {userSchema} = require("../schemas/user-schema");
const {Op} = require("sequelize");
const route = express.Router();
route.use(express.static(path.join(__dirname, 'static')));
module.exports = route;

route.get("/", async (req, res) => {
    try{
        const allUsers = await Users.findAll();
        return res.json(allUsers);
    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

route.delete("/obrisi/:id", async (req, res) => {
    try{
        const user = await Users.findByPk(req.params.id);
        user.destroy();
        return res.json(user.id);
    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

route.get("/id/:id",  async (req,res) => {
    try{
        const object = await Users.findByPk(req.params.id);
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
        const objects = await Users.findAll({
            where:{
                [Op.or]: [
                    {
                        name: {
                            [Op.substring]: req.params.q
                        },
                    },
                    {
                        admin: {
                            [Op.substring]: req.params.q
                        },
                    },
                    {
                        email: {
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
        let checkUser = {
            name: req.body.name,
            password: req.body.password,
            admin: req.body.admin,
            email: req.body.email
        }
        const validate = userSchema.validate(checkUser);
        if(validate.error){
            res.status(400).json(validate.error);
            return;
        }

        let user = await Users.findByPk( req.body.id );
        user.name = req.body.name;
        user.password = req.body.password;
        user.admin = req.body.admin;
        user.email = req.body.email;
        await user.save();
        res.send(user);

    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
})

route.post("/dodaj", async (req, res) => {
    try{
        let checkUser = {
            name: req.body.name,
            password: req.body.password,
            admin: req.body.admin,
            email: req.body.email
        }
        const validate = userSchema.validate(checkUser);
        if(validate.error){
            res.status(400).json(validate.error);
            return;
        }

        const noviUsers = await Users.create(req.body);
        return res.json(noviUsers);
    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});
