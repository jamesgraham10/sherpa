'use strict';

let express   = require('express'),
    router    = express.Router(),
    todosCtrl = require('../controllers/todosCtrl'),
    authCtrl  = require('../controllers/authCtrl'),
    userCtrl  = require('../controllers/userCtrl'),
    missionCtrl = require('../controllers/missionCtrl'),
    jwt       = require('express-jwt');

let auth = jwt({
  secret: process.env.JWT_SECRET,
  userProperty: 'token'
});

router.get('/user', auth, userCtrl.find);

router.get('/todos', auth, todosCtrl.fetch);
router.post('/todos', auth, todosCtrl.create);
router.get('/todos/:todoid', auth, todosCtrl.fetchOne);
router.put('/todos/:todoid', auth, todosCtrl.update);
router.put('/todos/mission/:todoid', auth, todosCtrl.assignMission);
router.delete('/todos/:todoid', auth, todosCtrl.delete);

router.post('/mission', auth, missionCtrl.create);
router.put('/mission/save', auth, missionCtrl.update);
router.delete('/mission', auth, missionCtrl.delete);
router.put('/mission/checkout', auth, missionCtrl.checkout);

router.post('/register', authCtrl.register);
router.post('/login', authCtrl.login);


module.exports = router;
