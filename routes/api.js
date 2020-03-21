// api.js
var express = require('express');
var router = express.Router();

var debug = require('debug')('api')

/* GET users listing. */
router.get('/a1', function (req, res, next) {
  console.log('in a1')
  debug('d in a1')
  res.json({ msg: 'message', v: 1 })
})

router.post('/p1', (req, res, next) => {
  console.log('in post mes ' + JSON.stringify(req.body))

  debug('d in p1 %o', req.body)
  res.json({ msg: 'in p1', v: 1 })
})

module.exports = router;