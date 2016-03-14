/*global require*/
/*global module*/
/*global console*/
var express = require('express');
var router = express.Router();
var User = require('../models/user');

/* GET home page. */
router.get('/', function (req, res, next) {
  'use strict';
  console.log('Session: ' + req.session.user_id);
  if (req.session.user_id === undefined) {
    res.redirect('/login')
  } else {
    res.render('/main/main', {title: 'Sistema de Gestión de Tableros'})
  }
});

router
  .get('/login', function (req, res, next) {
    'use strict';
    res.render('login');
  })
  .post('/login', function (req, res, next) {
    'use strict';
    console.log('Username: ' + req.body.username);
    console.log('Contraseña: ' + req.body.password);
    User.findOne({
      "email": req.body.username
    }, function (err, user) {
      if (err) {
        console.error(String(err));
      } else {
        console.log('password: ' + user.password);
        if (user.password === req.body.password) {
          req.session.user_id = user._id;
          console.log(req.session.user_id);
          //res.send('El usuario ha sido autenticado');
          res.render('./main/main', {title: 'Sistema de Gestion de Tableros'});
        } else {
          res.send('Por favor verifique sus datos');
        }
      }
    });
  });

router
  .get('/register', function (req, res, next) {
    'use strict';
    res.render('register');
  })
  .post('/register', function (req, res, next) {
    'use strict';
    console.log('Username: ' + req.body.username);
    console.log('Contraseña: ' + req.body.password);

    var newUser = new User({
      "email": req.body.username,
      "password": req.body.password
    });

    newUser.save(newUser, function (err) {
      if (err) {
        console.error('Error: ' + String(err));
      } else {
        res.send('Se ha registrado con exito');
      }
    });
  });

module.exports = router;
