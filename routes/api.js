// api.js
var express = require('express');
var router = express.Router();

var debug = require('debug')('api')
//import * as slib from "../lib/slib.js"
const slib = require("../lib/slib.js")

router.get('/a1', function (req, res, next) {
  console.log('in a1')
  debug('d in a1')
  res.json({ msg: 'message', v: 1 })
})

router.get('/sud1', function (req, res, next) {
  console.log('in sud1')
  res.json({ id: 1, v: {1:8,9:4,11:3,19:9,3:9,23:6,15:9,17:1,27:6,29:5,45:4,47:7,33:3,35:7,51:1,53:5,63:6,65:2,57:4,77:3,61:2,69:1,71:5,79:4}})
})

router.post('/p1', (req, res, next) => {
  console.log('in post mes ' + JSON.stringify(req.body))
  debug('d in p1 %o', req.body)
  res.json({ msg: 'in p1', v: 1 })
})

router.post('/sud1', (req, res, next) => {
  //console.log('in post mes ' + JSON.stringify(req.body))
  //debug('d in p1 %o', req.body)
  let x = slib.fun1(req.body)
  console.log('po s',x)
  //res.json({ msg: 'in p1', v: 1 })
  res.json(x)
})

module.exports = router;
