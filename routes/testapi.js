var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
let accounts = [];
let officers = [];
const Case = require('../models/case');
router.get('/', function(req, res, next) {
  Case.find()
  .exec()
  .then(docs=>{
    console.log(docs);
    res.json(docs);
  })
});
router.post('/', function(req, res, next) {
  const posted = new Case({
    _id : new mongoose.Types.ObjectId(),
    case:req.body.case,
    resolved : req.body.resolved,
    officer: req.body.officer
  });
  posted.save().then(res=>{
    console.log(res);
  }).catch(err=>{
    console.log(err);
  });
  res.send(accounts);
  accounts.push(posted);
});
router.get('/:id', function(req, res, next) {
const id = req.params.id;
Case.findById(id).exec().then(doc=>{
  console.log(doc);
  res.status(200).json(doc);
})
});
router.patch("/:id", (req, res, next) => {
  console.log(req.body);
  const id = req.params.id;
  const updateOps = {
    case: req.body.case,
    resolved: req.body.resolved,
    officer: req.body.officer
  };
  Case.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;