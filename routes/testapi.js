const express = require('express');

const router = express.Router();
const mongoose = require('mongoose');

const accounts = [];
const officers = [];
const Case = require('../models/case');

router.get('/', (req, res, next) => {
  Case.find()
    .exec()
    .then((docs) => {
      console.log(docs);
      res.json(docs);
    });
});
router.post('/', (req, res, next) => {
  const posted = new Case({
    _id: new mongoose.Types.ObjectId(),
    case: req.body.case,
    resolved: req.body.resolved,
    officer: req.body.officer,
  });
  posted.save().then((res) => {
    console.log(res);
  }).catch((err) => {
    console.log(err);
  });
  res.send(accounts);
  accounts.push(posted);
});
router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  Case.findById(id).exec().then((doc) => {
    console.log(doc);
    res.status(200).json(doc);
  });
});
router.patch('/:id', (req, res, next) => {
  console.log(req.body);
  const { id } = req.params;
  const updateOps = {
    case: req.body.case,
    resolved: req.body.resolved,
    officer: req.body.officer,
  };
  Case.update({ _id: id }, { $set: updateOps })
    .exec()
    .then((result) => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

module.exports = router;
