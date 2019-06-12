var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/examples", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });

  app.get("/form", function(req, res) {
    res.render("form");
  });

  app.post("/api/memes", function(req, res) {
    console.log(req.body);
    res.send("Made it to /api/memes post request");
    db.examples.insertOne(req.body.caption, "test", function() {
      console.log("Insert one function hit");
      res.redirect("/");
    });
  });

  // Create a new example
  app.post("/api/examples", function(req, res) {
    db.Example.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
      res.json(dbExample);
    });
  });
  //UPVOTE calling the api for meme getting the unique id then incrementiing "likes" by 1
  app.put("/api/Memelike/:id", function(req, res) {
    console.log(req.params.id);
    db.Meme.findByPk(req.params.id)
      .then(function(Meme) {
        return Meme.increment(["likes"], { by: 1 });
      })
      .then(function(dbMemelike) {
        res.json(dbMemelike);
      });
  });
  //downvote calling the api for meme getting the unique id then incrementiing "dislikes" by 1

  // eslint-disable-next-line no-unused-vars
  app.put("/api/Memedislike/:id", function(req, res) {
    console.log(req.params.id);
    db.Meme.findByPk(req.params.id)
      .then(function(Meme) {
        return Meme.increment(["dislikes"], { by: 1 });
      })
      .then(function(dbMemedislike) {
        res.json(dbMemedislike);
      });
  });
};
