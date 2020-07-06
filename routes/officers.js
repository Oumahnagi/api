const express = require('express');

const router = express.Router();
const mongoose = require('mongoose');

const accounts = [];
const Officer = require('../models/case');

router.get('/', (req, res, next) => {
  Officer.find()
    .exec()
    .then((docs) => {
      console.log(docs);
      res.json(docs);
    });
});
router.post('/', (req, res, next) => {
  const posted = new Officer({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    free: false,
  });
  posted.save().then((res) => {
    console.log(res);
  }).catch((err) => {
    console.log(err);
  });
});
router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  Officer.findById(id).exec().then((doc) => {
    console.log(doc);
    res.status(200).json(doc);
  });
});
router.patch('/:id', (req, res, next) => {
  console.log(req.body);
  const { id } = req.params;
  const updateOps = {
    name: req.body.name,
    free: req.body.free,
  };
  Officer.update({ _id: id }, { $set: updateOps })
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
