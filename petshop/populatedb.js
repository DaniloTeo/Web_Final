#! /usr/bin/env node

console.log('This script populates some test animal, appointment, cart, product, sale, service, user to your database. Specified database as argument - e.g.: populatedb mongodb://your_username:your_password@your_dabase_url');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
if (!userArgs[0].startsWith('mongodb://')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}

var async = require('async')
var Animal = require('./models/animal')
var Appointment = require('./models/appointment')
var Cart = require('./models/cart')
var Product = require('./models/product')
var Service = require('./models/service')
var User = require('./models/user')


var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

var animals = []
var appointments = []
var carts = []
var products = []
var services = []
var users = []

function animalCreate(name, picture, race, age, userID, cb) {
  animaldetail = {name: name, picture: picture, race: race, age: age, userID: userID }
  
  
  var animal = new Animal(animaldetail);
       
  animal.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Animal: ' + animal);
    animals.push(animal)
    cb(null, animal)
  }  );
}

function appointmentCreate(userID, animalID, serviceID, date, cb) {
  var appointment = new Appointment({userID: userID, animalID: animalID, serviceID: serviceID, date: date});
       
  appointment.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New Appointment: ' + appointment);
    appointments.push(appointment)
    cb(null, appointment);
  }   );
}

function cartCreate(userID, productID, quantity, cb) {
    
  var cart = new Cart({userID: userID, productID: productID, quantity: quantity});    
  cart.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Cart: ' + cart);
    carts.push(cart)
    cb(null, cart)
  }  );
}


function productCreate(name, picture, description, price, amount, sold, cb) {
    
  var product = new Product({name: name, picture: picture, description: description, price: price, amount: amount, sold: sold});    
  product.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Product: ' + product);
    products.push(product)
    cb(null, product)
  }  );
}





function serviceCreate(name, picture, description, price, cb) {
    
  var service = new Service({name: name, picture: picture, description: description, price: price});    
  service.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Service: ' + service);
    services.push(service)
    cb(null, service)
  }  );
}


function userCreate(name, address, picture, phone, email, username, password, auth, cb) {
    
  var user = new User({name: name, address: address, picture: picture, phone: phone, email: email, username: username, password: password, auth: auth});    
  user.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New User: ' + user);
    users.push(user)
    cb(null, user)
  }  );
}




function createProductServiceUser(cb) {
    async.series([
        function(callback) {
          productCreate("Food4Dog", "https://imgmanagercb-a.akamaihd.net/racao-para-cachorro/pedigree-adulto-carne-e-vegetais-pacote-1-kg_300x300-PU5f8da_1.jpg", "Comida de Cachorro", 60.90, 50, 3, callback);
        },
        function(callback) {
          productCreate("Food4Cat", "https://images-americanas.b2w.io/produtos/01/00/item/5836/2/5836228SZ.jpg", "Comida de Gato", 60.90, 50, 3, callback);
        },
        function(callback) {
          productCreate("Mr. SandCat", "https://emais.estadao.com.br/blogs/comportamento-animal/wp-content/uploads/sites/205/2017/10/gato-caixa-de-areia.jpg", "Areia para gatos", 20.50, 70, 7, callback);
        },
        function(callback) {
          serviceCreate("Banho", "https://webcachorros.com.br/wp-content/uploads/2016/07/banho-em-cachorros-21.jpg", "Servico de Banho para os pets", 100.00, callback);
        },
        function(callback) {
          serviceCreate("Tosa", "https://http2.mlstatic.com/maquina-tosa-pet-hair-cachorro-e-gato-sem-fio-110v-D_NQ_NP_875411-MLB20560623923_012016-F.jpg", "Servico de Tosa para os pets", 70.00, callback);
        },
        function(callback) {
          serviceCreate("Veterinario", "http://lupusalimentos.com.br/system/wp-content/uploads/2014/03/veterinario.jpg", "Atendimento Veterinario para os pets", 50.00, callback);
        },
        function(callback) {
          userCreate("Danilo", "Casa na Rua Avenida", null, "12345679", "dan@email.com", "danteo", "danilo", "adm", callback);
        },
        function(callback) {
          userCreate("Rodrigo", "Casa na Rua Avenida", "http://www.jb.com.br/media/fotos/2013/06/17/300w/rodrigo-santoro-como-xerxes-ator-recusou-novela-da-globo-e-continua-em-h_1.jpg", "22345679", "rod@email.com", "rvalim", "rodmaciel", "usr", callback);
        },
        function(callback) {
          userCreate("Leonardo", "Casa na Rua Avenida", "https://catracalivre.com.br/wp-content/uploads/2017/05/sheldon_cooper.jpg", "32345679", "leo@email.com", "lslemes", "leolemes", "usr", callback);
        },
        function(callback) {
          userCreate("Admin", "Endereco", null, "12345679", "admin@email.com", "admin", "admin", "adm", callback);
        }

        
        ],
        // optional callback
        cb);
}


function createAnimals(cb) {
    async.series([
        function(callback) {
           animalCreate("Floquinho", "https://abrilvejasp.files.wordpress.com/2017/02/8f2f0d775e735246520a545ececffa14.jpg?quality=70&strip=all&w=650&strip=info", "Bernese", 5, users[2], callback);
        },
        function(callback) {
           animalCreate("Smoke", "https://static.fofuxo.com.br/_upload/galleries/2013/04/09/chartreux-5164af1a0d0c2.jpg", "Siames", 3, users[1], callback);
        },
        function(callback) {
           animalCreate("Adoberval", "http://tudosobrecachorros.com.br/wp-content/uploads/2012/09/Golden-Retriever.jpg", "Golden", 7, users[1], callback);
        },
        function(callback) {
           animalCreate("Fofinha", "https://http2.mlstatic.com/filhote-persa-fmea-D_NQ_NP_971477-MLB26506797494_122017-F.jpg", "Persa", 2, users[2], callback);
        }
        
        ],
        // optional callback
        cb);
}


function createAppointments(cb) {
    async.series([
        function(callback) {
           appointmentCreate(users[1], animals[1], services[0], '2018-08-26', callback);
        },
        function(callback) {
           appointmentCreate(users[2], animals[0], services[1], '2018-06-26', callback);
        },
        function(callback) {
           appointmentCreate(users[2], animals[3], services[2], '2018-06-16', callback);
        },
        function(callback) {
           appointmentCreate(users[1], animals[2], services[1], '2018-08-16', callback);
        }
        
        ],
        // optional callback
        cb);
}


function createCarts(cb) {
    async.series([
        function(callback) {
          cartCreate(users[1], products, [3, 1, 1], callback);   
        },
        
        function(callback) {
           cartCreate(users[2], [products[0]], [2], callback);   
        }
        

        ],
        // optional callback
        cb);
}









async.series([
    createProductServiceUser,
    createAnimals,
    createAppointments,
    createCarts
    
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        //console.log('BOOKInstances: '+bookinstances);
        
    }
    // All done, disconnect from database
    mongoose.connection.close();
});




