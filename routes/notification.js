const express = require("express");
const { sequelize, Notifications } = require("../models");
const path = require("path");
const {Op} = require("sequelize");
const {notificationSchema} = require("../schemas/notification-schema");
const route = express.Router();
route.use(express.static(path.join(__dirname, 'static')));

module.exports = route;

route.get("/", async (req, res) => {
    try{
        const allNotifications = await Notifications.findAll();
        return res.json(allNotifications);
    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

route.delete("/obrisi/:id", async (req, res) => {
    try{
        const notifications = await Notifications.findByPk(req.params.id);
        notifications.destroy();
        return res.json(notifications.id);
    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

route.get("/id/:id",  async (req,res) => {
    try{
        const object = await Notifications.findByPk(req.params.id);
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
        const objects = await Notifications.findAll({
            where:{
                [Op.or]: [{
                    sent_at: {
                        [Op.substring]: req.params.q
                    },
                },
                    {
                        contents: {
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
        let checkNotifications = {
            sent_at: req.body.sent_at,
            contents: req.body.contents,
            patron_id: req.body.patron_id
        }
        const validate = notificationSchema.validate(checkNotifications);
        if(validate.error){
            res.status(400).json(validate.error);
            return;
        }

        let notifications = await Notifications.findByPk( req.body.id );
        notifications.sent_at = req.body.sent_at;
        notifications.contents = req.body.contents;
        notifications.patron_id = req.body.patron_id;
        await notifications.save();
        res.send(notifications);

    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
})

route.post("/dodaj", async (req, res) => {
    try{
        let checkNotifications = {
            sent_at: req.body.sent_at,
            contents: req.body.contents,
            patron_id: req.body.patron_id
        }
        const validate = notificationSchema.validate(checkNotifications);
        if(validate.error){
            res.status(400).json(validate.error);
            return;
        }

        const noviNotifications = await Notifications.create(req.body);
        return res.json(noviNotifications);
    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});
