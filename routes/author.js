const express = require("express");
const { sequelize, Authors } = require("../models");
const path = require("path");
const {authorSchema} = require("../schemas/author-schema");
const route = express.Router();
route.use(express.static(path.join(__dirname, 'static')));
module.exports = route;

route.get("/", async (req, res) => {
  try{
      const allAuthors = await Authors.findAll();
      return res.json(allAuthors);
  } catch(err){
      console.log(err);
      res.status(500).json({ error: "Greska", data: err });
  }
});

route.delete("/obrisi/:id", async (req, res) => {
  try{
      const author = await Authors.findByPk(req.params.id);
      author.destroy();
      return res.json(author.id);
  } catch(err){
      console.log(err);
      res.status(500).json({ error: "Greska", data: err });
  }
});

route.get("/id/:id",  async (req,res) => {
  try{
      const object = await Authors.findByPk(req.params.id);
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
      const objects = await Authors.findAll({
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
    let author = await Authors.findByPk( req.body.id );

      let checkAuthor = {
          name: req.body.name,
      }
      const validate = authorSchema.validate(checkAuthor);
      if(validate.error){
          res.status(400).json(validate.error);
          return;
      }

    author.name = req.body.name;
    await author.save();
    res.send(author);

  } catch(err){
    console.log(err);
    res.status(500).json({ error: "Greska", data: err });
  }
})

route.post("/dodaj", async (req, res) => {
  try{
      let checkAuthor = {
          name: req.body.name,
      }
      const validate = authorSchema.validate(checkAuthor);
      if(validate.error){
          res.status(400).json(validate.error);
          return;
      }

      const noviAuthor = await Authors.create(req.body);
      return res.json(noviAuthor);
  } catch(err){
      console.log(err);
      res.status(500).json({ error: "Greska", data: err });
  }
});
