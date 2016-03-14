var express = require('express');
var router = express.Router();
var User = require('../models/user');

router
  .get('/configurar', function (req, res, next) {
    res.render('./main/configurar', {
      title: 'Configuracion del Sistema'
    });
  });

router
  .get('/usuario', function (req, res, next) {
    res.render('./users/user', {
      title: 'Nuevo Usuario',
      user: {email: null, password: null}
    });
  })
  .post('/usuario', function (req, res, next) {
    var user = new User();

    user.email = req.body.username;
    user.password = req.body.password;
    console.log('user: %O', user);
    user.save(function (err) {
      if (err) {
        console.error(String(err));
      } else {
        console.log('El usuario se guardo con exito');
      }
    });
  })
  .put('/usuario/:id', function(req, res, next) {
    var user = new User();
    var id = req.params.id;
    user.email = req.body.username;
    user.password = req.body.password;

    user.findByIdAndUpdate(id, user, function(err) {
      if (err) {
        console.error(String(err));
      } else {
        res.redirect('/users/usuarios');
      }
    })
  });

router
  .get('/usuario/:id/edit', function (req, res, next) {
    var id = req.params.id;
    console.log('Parametro id: '+id);
    User.findById(id, function(err, user) {
      if (err) {
        console.log('No existe el usuario indicado');
      } else {
        res.render('./users/user', {title: 'Actualizar Usuario', user: user});
      }
    });

  });

/* GET users listing. */
router
  .get('/usuarios', function (req, res, next) {
    User.find(function (err, users) {
      if (err) {
        console.error('Usuarios no encontrados');
      } else {
        //console.log('Lista Usuarios %O', users);
        res.render('./users/users', {
          title: 'Lista de usuarios',
          users: users
        });
      }
    });
  });

module.exports = router;
