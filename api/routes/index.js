'use strict';

let express   = require('express'),
    router    = express.Router(),
    todosCtrl = require('../controllers/todosCtrl'),
    authCtrl  = require('../controllers/authCtrl'),
    jwt       = require('express-jwt');

let auth = jwt({
  secret: process.env.JWT_SECRET,
  userProperty: 'token'
});

router.get('/todos', auth, todosCtrl.fetch);
router.post('/todos', auth, todosCtrl.create);
router.get('/todos/:todoid', auth, todosCtrl.fetchOne);
router.put('/todos/:todoid', auth, todosCtrl.update);
router.delete('/todos/:todoid', auth, todosCtrl.delete);

router.post('/register', authCtrl.register);
//apiRouter.post('/login', authCtrl.login);

module.exports = router;
