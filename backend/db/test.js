// {}
const bcrypt = require('bcrypt');
const saltRounds = 10;
module.exports = {
  initData (db) {
    console.log(' ');
    console.log('=====>>>>> START initdata');
    console.log(' ');

    db.query('delete from deliveries').then(() => {
      db.query('delete from deliverygroups').then(() => {
        db.query('delete from orderitems').then(() => {
          db.query('delete from orders').then(() => {
            db.query('delete from accounts').then(() => {
              db.query('delete from users').then(() => {

                bcrypt.hash('a', saltRounds)
                .then(hash => {
                  db.models.User
                  .create({username: 'a', password: hash})
                  .then(user => {
                    db.models.Account.create({UserId: user.id, description: 'Alfred Hitchcock', address: 'Vicolo Corto', location: 'Milano'})
                    .then(account => {
                      db.models.Order.create({UserId: user.id, AccountId: account.id, order_num: 'Q1W2'})
                      .then(order => {
                        db.models.Orderitem.create({UserId: user.id, OrderId: order.id, product_key: 'A-12345', qty: 1 ,unit_weight: 5, total_weight: 5});
                        db.models.Orderitem.create({UserId: user.id, OrderId: order.id, product_key: 'B-12345', qty: 2 ,unit_weight: 4, total_weight: 8});
                        db.models.Orderitem.create({UserId: user.id, OrderId: order.id, product_key: 'C-12345', qty: 3 ,unit_weight: 3, total_weight: 9});
                        db.models.Orderitem.create({UserId: user.id, OrderId: order.id, product_key: 'D-12345', qty: 4 ,unit_weight: 2, total_weight: 8});
                        db.models.Orderitem.create({UserId: user.id, OrderId: order.id, product_key: 'E-12345', qty: 5 ,unit_weight: 1, total_weight: 5});
                      });
                    });
                    db.models.Account.create({UserId: user.id, description: 'Howard Hawks', address: 'Viale Monterosa', location: 'Milano'})
                    .then(account => {
                      db.models.Order.create({UserId: user.id, AccountId: account.id, order_num: 'W2E3'})
                      .then(order => {
                        db.models.Orderitem.create({UserId: user.id, OrderId: order.id, product_key: 'A-12345', qty: 2 ,unit_weight: 4, total_weight: 8});
                        db.models.Orderitem.create({UserId: user.id, OrderId: order.id, product_key: 'B-12345', qty: 3 ,unit_weight: 3, total_weight: 9});
                        db.models.Orderitem.create({UserId: user.id, OrderId: order.id, product_key: 'C-12345', qty: 4 ,unit_weight: 2, total_weight: 8});
                        db.models.Orderitem.create({UserId: user.id, OrderId: order.id, product_key: 'D-12345', qty: 5 ,unit_weight: 1, total_weight: 5});
                        db.models.Orderitem.create({UserId: user.id, OrderId: order.id, product_key: 'E-12345', qty: 1 ,unit_weight: 5, total_weight: 5});
                      });
                    });
                    db.models.Account.create({UserId: user.id, description: 'Buster Keaton', address: 'Corso Ateneo', location: 'Milano'})
                    .then(account => {
                      db.models.Order.create({UserId: user.id, AccountId: account.id, order_num: 'E3R4'})
                      .then(order => {
                        db.models.Orderitem.create({UserId: user.id, OrderId: order.id, product_key: 'A-12345', qty: 3 ,unit_weight: 3, total_weight: 9});
                        db.models.Orderitem.create({UserId: user.id, OrderId: order.id, product_key: 'B-12345', qty: 4 ,unit_weight: 2, total_weight: 8});
                        db.models.Orderitem.create({UserId: user.id, OrderId: order.id, product_key: 'C-12345', qty: 5 ,unit_weight: 1, total_weight: 5});
                        db.models.Orderitem.create({UserId: user.id, OrderId: order.id, product_key: 'D-12345', qty: 1 ,unit_weight: 5, total_weight: 5});
                        db.models.Orderitem.create({UserId: user.id, OrderId: order.id, product_key: 'E-12345', qty: 2 ,unit_weight: 4, total_weight: 8});
                      });
                    });
                    db.models.Account.create({UserId: user.id, description: 'Federico Fellini', address: 'Corso Raffaello', location: 'Milano'})
                    .then(account => {
                      db.models.Order.create({UserId: user.id, AccountId: account.id, order_num: 'R4T5'})
                      .then(order => {
                        db.models.Orderitem.create({UserId: user.id, OrderId: order.id, product_key: 'A-12345', qty: 4 ,unit_weight: 2, total_weight: 8});
                        db.models.Orderitem.create({UserId: user.id, OrderId: order.id, product_key: 'B-12345', qty: 5 ,unit_weight: 1, total_weight: 5});
                        db.models.Orderitem.create({UserId: user.id, OrderId: order.id, product_key: 'C-12345', qty: 1 ,unit_weight: 5, total_weight: 5});
                        db.models.Orderitem.create({UserId: user.id, OrderId: order.id, product_key: 'D-12345', qty: 2 ,unit_weight: 4, total_weight: 8});
                        db.models.Orderitem.create({UserId: user.id, OrderId: order.id, product_key: 'E-12345', qty: 3 ,unit_weight: 3, total_weight: 9});
                      });
                    });
                    db.models.Account.create({UserId: user.id, description: 'John Huston', address: 'Corso Magellano', location: 'Milano'})
                    .then(account => {
                      db.models.Order.create({UserId: user.id, AccountId: account.id, order_num: 'T5Y6'})
                      .then(order => {
                        db.models.Orderitem.create({UserId: user.id, OrderId: order.id, product_key: 'A-12345', qty: 5 ,unit_weight: 1, total_weight: 5});
                        db.models.Orderitem.create({UserId: user.id, OrderId: order.id, product_key: 'B-12345', qty: 1 ,unit_weight: 5, total_weight: 5});
                        db.models.Orderitem.create({UserId: user.id, OrderId: order.id, product_key: 'C-12345', qty: 2 ,unit_weight: 4, total_weight: 8});
                        db.models.Orderitem.create({UserId: user.id, OrderId: order.id, product_key: 'D-12345', qty: 3 ,unit_weight: 3, total_weight: 9});
                        db.models.Orderitem.create({UserId: user.id, OrderId: order.id, product_key: 'E-12345', qty: 4 ,unit_weight: 2, total_weight: 8});
                      });
                    });
                    db.models.Account.create({UserId: user.id, description: 'Ernst Lubitsch', address: 'Viale Traiano', location: 'Milano'})
                    .then(account => {
                      db.models.Order.create({UserId: user.id, AccountId: account.id, order_num: 'Y6U7'})
                      .then(order => {
                        db.models.Orderitem.create({UserId: user.id, OrderId: order.id, product_key: 'A-12345', qty: 1 ,unit_weight: 5, total_weight: 5});
                        db.models.Orderitem.create({UserId: user.id, OrderId: order.id, product_key: 'B-12345', qty: 2 ,unit_weight: 4, total_weight: 8});
                        db.models.Orderitem.create({UserId: user.id, OrderId: order.id, product_key: 'C-12345', qty: 3 ,unit_weight: 3, total_weight: 9});
                        db.models.Orderitem.create({UserId: user.id, OrderId: order.id, product_key: 'D-12345', qty: 4 ,unit_weight: 2, total_weight: 8});
                        db.models.Orderitem.create({UserId: user.id, OrderId: order.id, product_key: 'E-12345', qty: 5 ,unit_weight: 1, total_weight: 5});
                      });
                    });
                    db.models.Account.create({UserId: user.id, description: 'Woody Allen', address: 'Corso Impero', location: 'Milano'})
                    .then(account => {
                      db.models.Order.create({UserId: user.id, AccountId: account.id, order_num: 'U7I8'})
                      .then(order => {
                        db.models.Orderitem.create({UserId: user.id, OrderId: order.id, product_key: 'A-12345', qty: 2 ,unit_weight: 4, total_weight: 8});
                        db.models.Orderitem.create({UserId: user.id, OrderId: order.id, product_key: 'B-12345', qty: 3 ,unit_weight: 3, total_weight: 9});
                        db.models.Orderitem.create({UserId: user.id, OrderId: order.id, product_key: 'C-12345', qty: 4 ,unit_weight: 2, total_weight: 8});
                        db.models.Orderitem.create({UserId: user.id, OrderId: order.id, product_key: 'D-12345', qty: 5 ,unit_weight: 1, total_weight: 5});
                        db.models.Orderitem.create({UserId: user.id, OrderId: order.id, product_key: 'E-12345', qty: 1 ,unit_weight: 5, total_weight: 5});
                      });
                    });
                  });
                });

                bcrypt.hash('b', saltRounds)
                .then(hash => {
                  db.models.User
                  .create({username: 'b', password: hash})
                  .then((user) => {
                    db.models.Account.create({UserId: user.id, description: 'Orson Welles', address: 'Vicolo Stretto', location: 'Milano'})
                    .then(account => {
                      db.models.Order.create({UserId: user.id, AccountId: account.id, order_num: 'I8O9'})
                      .then(order => {
                        db.models.Orderitem.create({UserId: user.id, OrderId: order.id, product_key: 'A-12345', qty: 3 ,unit_weight: 3, total_weight: 8});
                        db.models.Orderitem.create({UserId: user.id, OrderId: order.id, product_key: 'B-12345', qty: 4 ,unit_weight: 2, total_weight: 8});
                        db.models.Orderitem.create({UserId: user.id, OrderId: order.id, product_key: 'C-12345', qty: 5 ,unit_weight: 1, total_weight: 5});
                        db.models.Orderitem.create({UserId: user.id, OrderId: order.id, product_key: 'D-12345', qty: 1 ,unit_weight: 5, total_weight: 5});
                        db.models.Orderitem.create({UserId: user.id, OrderId: order.id, product_key: 'E-12345', qty: 2 ,unit_weight: 4, total_weight: 8});
                      });
                    });
                    db.models.Account.create({UserId: user.id, description: 'Martin Scorsese', address: 'Viale Vesuvio', location: 'Milano'})
                    .then(account => {
                      db.models.Order.create({UserId: user.id, AccountId: account.id, order_num: 'O9P0'})
                      .then(order => {
                        db.models.Orderitem.create({UserId: user.id, OrderId: order.id, product_key: 'A-12345', qty: 4 ,unit_weight: 2, total_weight: 8});
                        db.models.Orderitem.create({UserId: user.id, OrderId: order.id, product_key: 'B-12345', qty: 5 ,unit_weight: 1, total_weight: 5});
                        db.models.Orderitem.create({UserId: user.id, OrderId: order.id, product_key: 'C-12345', qty: 1 ,unit_weight: 5, total_weight: 5});
                        db.models.Orderitem.create({UserId: user.id, OrderId: order.id, product_key: 'D-12345', qty: 2 ,unit_weight: 4, total_weight: 8});
                        db.models.Orderitem.create({UserId: user.id, OrderId: order.id, product_key: 'E-12345', qty: 3 ,unit_weight: 3, total_weight: 9});
                      });
                    });
                    db.models.Account.create({UserId: user.id, description: 'Ingmar Bergman', address: 'Piazza Università', location: 'Milano'})
                    .then(account => {
                      db.models.Order.create({UserId: user.id, AccountId: account.id, order_num: 'A1S2'})
                      .then(order => {
                        db.models.Orderitem.create({UserId: user.id, OrderId: order.id, product_key: 'A-12345', qty: 5 ,unit_weight: 1, total_weight: 5});
                        db.models.Orderitem.create({UserId: user.id, OrderId: order.id, product_key: 'B-12345', qty: 1 ,unit_weight: 5, total_weight: 5});
                        db.models.Orderitem.create({UserId: user.id, OrderId: order.id, product_key: 'C-12345', qty: 2 ,unit_weight: 4, total_weight: 8});
                        db.models.Orderitem.create({UserId: user.id, OrderId: order.id, product_key: 'D-12345', qty: 3 ,unit_weight: 3, total_weight: 9});
                        db.models.Orderitem.create({UserId: user.id, OrderId: order.id, product_key: 'E-12345', qty: 4 ,unit_weight: 2, total_weight: 8});
                      });
                    });
                    db.models.Account.create({UserId: user.id, description: 'Steven Spielberg', address: 'Piazza Dante', location: 'Milano'})
                    .then(account => {
                      db.models.Order.create({UserId: user.id, AccountId: account.id, order_num: 'S2D3'})
                      .then(order => {
                        db.models.Orderitem.create({UserId: user.id, OrderId: order.id, product_key: 'A-12345', qty: 1 ,unit_weight: 5, total_weight: 5});
                        db.models.Orderitem.create({UserId: user.id, OrderId: order.id, product_key: 'B-12345', qty: 2 ,unit_weight: 4, total_weight: 8});
                        db.models.Orderitem.create({UserId: user.id, OrderId: order.id, product_key: 'C-12345', qty: 3 ,unit_weight: 3, total_weight: 9});
                        db.models.Orderitem.create({UserId: user.id, OrderId: order.id, product_key: 'D-12345', qty: 4 ,unit_weight: 2, total_weight: 8});
                        db.models.Orderitem.create({UserId: user.id, OrderId: order.id, product_key: 'E-12345', qty: 5 ,unit_weight: 1, total_weight: 5});
                      });
                    });
                    db.models.Account.create({UserId: user.id, description: 'Luis Buñuel', address: 'Largo Colombo', location: 'Milano'})
                    .then(account => {
                      db.models.Order.create({UserId: user.id, AccountId: account.id, order_num: 'D3F4'})
                      .then(order => {
                        db.models.Orderitem.create({UserId: user.id, OrderId: order.id, product_key: 'A-12345', qty: 2 ,unit_weight: 4, total_weight: 8});
                        db.models.Orderitem.create({UserId: user.id, OrderId: order.id, product_key: 'B-12345', qty: 3 ,unit_weight: 3, total_weight: 9});
                        db.models.Orderitem.create({UserId: user.id, OrderId: order.id, product_key: 'C-12345', qty: 4 ,unit_weight: 2, total_weight: 8});
                        db.models.Orderitem.create({UserId: user.id, OrderId: order.id, product_key: 'D-12345', qty: 5 ,unit_weight: 1, total_weight: 5});
                        db.models.Orderitem.create({UserId: user.id, OrderId: order.id, product_key: 'E-12345', qty: 1 ,unit_weight: 5, total_weight: 5});
                      });
                    });
                    db.models.Account.create({UserId: user.id, description: 'Robert Altman', address: 'Piazza Giulio Cesare', location: 'Milano'})
                    .then(account => {
                      db.models.Order.create({UserId: user.id, AccountId: account.id, order_num: 'F4G5'})
                      .then(order => {
                        db.models.Orderitem.create({UserId: user.id, OrderId: order.id, product_key: 'A-12345', qty: 3 ,unit_weight: 3, total_weight: 9});
                        db.models.Orderitem.create({UserId: user.id, OrderId: order.id, product_key: 'B-12345', qty: 4 ,unit_weight: 2, total_weight: 8});
                        db.models.Orderitem.create({UserId: user.id, OrderId: order.id, product_key: 'C-12345', qty: 5 ,unit_weight: 1, total_weight: 5});
                        db.models.Orderitem.create({UserId: user.id, OrderId: order.id, product_key: 'D-12345', qty: 1 ,unit_weight: 5, total_weight: 5});
                        db.models.Orderitem.create({UserId: user.id, OrderId: order.id, product_key: 'E-12345', qty: 2 ,unit_weight: 4, total_weight: 8});
                      });
                    });
                    db.models.Account.create({UserId: user.id, description: 'Vincente Minnelli', address: 'Largo Augusto', location: 'Milano'})
                    .then(account => {
                      db.models.Order.create({UserId: user.id, AccountId: account.id, order_num: 'G5H6'})
                      .then(order => {
                        db.models.Orderitem.create({UserId: user.id, OrderId: order.id, product_key: 'A-12345', qty: 4 ,unit_weight: 2, total_weight: 8});
                        db.models.Orderitem.create({UserId: user.id, OrderId: order.id, product_key: 'B-12345', qty: 5 ,unit_weight: 1, total_weight: 5});
                        db.models.Orderitem.create({UserId: user.id, OrderId: order.id, product_key: 'C-12345', qty: 1 ,unit_weight: 5, total_weight: 5});
                        db.models.Orderitem.create({UserId: user.id, OrderId: order.id, product_key: 'D-12345', qty: 2 ,unit_weight: 4, total_weight: 8});
                        db.models.Orderitem.create({UserId: user.id, OrderId: order.id, product_key: 'E-12345', qty: 3 ,unit_weight: 3, total_weight: 9});
                      });
                    });
                  });
                });

                bcrypt.hash('c', saltRounds)
                .then(hash => {
                  db.models.User
                  .create({username: 'c', password: hash})
                  .then((user) => {
                    db.models.Account.create({UserId: user.id, description: 'John Ford', address: 'Bastioni Gran Sasso', location: 'Milano'})
                    .then(account => {
                      db.models.Order.create({UserId: user.id, AccountId: account.id, order_num: 'H6J7'})
                      .then(order => {
                        db.models.Orderitem.create({UserId: user.id, OrderId: order.id, product_key: 'A-12345', qty: 5 ,unit_weight: 1, total_weight: 5});
                        db.models.Orderitem.create({UserId: user.id, OrderId: order.id, product_key: 'B-12345', qty: 1 ,unit_weight: 5, total_weight: 5});
                        db.models.Orderitem.create({UserId: user.id, OrderId: order.id, product_key: 'C-12345', qty: 2 ,unit_weight: 4, total_weight: 8});
                        db.models.Orderitem.create({UserId: user.id, OrderId: order.id, product_key: 'D-12345', qty: 3 ,unit_weight: 3, total_weight: 9});
                        db.models.Orderitem.create({UserId: user.id, OrderId: order.id, product_key: 'E-12345', qty: 4 ,unit_weight: 2, total_weight: 8});
                      });
                    });
                    db.models.Account.create({UserId: user.id, description: 'Akira Kurosawa', address: 'Via Accademia', location: 'Milano'})
                    .then(account => {
                      db.models.Order.create({UserId: user.id, AccountId: account.id, order_num: 'J7K8'})
                      .then(order => {
                        db.models.Orderitem.create({UserId: user.id, OrderId: order.id, product_key: 'A-12345', qty: 1 ,unit_weight: 5, total_weight: 5});
                        db.models.Orderitem.create({UserId: user.id, OrderId: order.id, product_key: 'B-12345', qty: 2 ,unit_weight: 4, total_weight: 8});
                        db.models.Orderitem.create({UserId: user.id, OrderId: order.id, product_key: 'C-12345', qty: 3 ,unit_weight: 3, total_weight: 9});
                        db.models.Orderitem.create({UserId: user.id, OrderId: order.id, product_key: 'D-12345', qty: 4 ,unit_weight: 2, total_weight: 8});
                        db.models.Orderitem.create({UserId: user.id, OrderId: order.id, product_key: 'E-12345', qty: 5 ,unit_weight: 1, total_weight: 5});
                      });
                    });
                    db.models.Account.create({UserId: user.id, description: 'Frank Capra', address: 'Via Verdi', location: 'Milano'})
                    .then(account => {
                      db.models.Order.create({UserId: user.id, AccountId: account.id, order_num: 'K8L9'})
                      .then(order => {
                        db.models.Orderitem.create({UserId: user.id, OrderId: order.id, product_key: 'A-12345', qty: 2 ,unit_weight: 4, total_weight: 8});
                        db.models.Orderitem.create({UserId: user.id, OrderId: order.id, product_key: 'B-12345', qty: 3 ,unit_weight: 3, total_weight: 9});
                        db.models.Orderitem.create({UserId: user.id, OrderId: order.id, product_key: 'C-12345', qty: 4 ,unit_weight: 2, total_weight: 8});
                        db.models.Orderitem.create({UserId: user.id, OrderId: order.id, product_key: 'D-12345', qty: 5 ,unit_weight: 1, total_weight: 5});
                        db.models.Orderitem.create({UserId: user.id, OrderId: order.id, product_key: 'E-12345', qty: 1 ,unit_weight: 5, total_weight: 5});
                      });
                    });
                    db.models.Account.create({UserId: user.id, description: 'Jean Renoir', address: 'Via Marco Polo', location: 'Milano'})
                    .then(account => {
                      db.models.Order.create({UserId: user.id, AccountId: account.id, order_num: 'L9Z1'})
                      .then(order => {
                        db.models.Orderitem.create({UserId: user.id, OrderId: order.id, product_key: 'A-12345', qty: 3 ,unit_weight: 3, total_weight: 9});
                        db.models.Orderitem.create({UserId: user.id, OrderId: order.id, product_key: 'B-12345', qty: 4 ,unit_weight: 2, total_weight: 8});
                        db.models.Orderitem.create({UserId: user.id, OrderId: order.id, product_key: 'C-12345', qty: 5 ,unit_weight: 1, total_weight: 5});
                        db.models.Orderitem.create({UserId: user.id, OrderId: order.id, product_key: 'D-12345', qty: 1 ,unit_weight: 5, total_weight: 5});
                        db.models.Orderitem.create({UserId: user.id, OrderId: order.id, product_key: 'E-12345', qty: 2 ,unit_weight: 4, total_weight: 8});
                      });
                    });
                    db.models.Account.create({UserId: user.id, description: 'D.W. Griffith', address: 'Viale Costantino', location: 'Milano'})
                    .then(account => {
                      db.models.Order.create({UserId: user.id, AccountId: account.id, order_num: 'Z1X2'})
                      .then(order => {
                        db.models.Orderitem.create({UserId: user.id, OrderId: order.id, product_key: 'A-12345', qty: 4 ,unit_weight: 2, total_weight: 8});
                        db.models.Orderitem.create({UserId: user.id, OrderId: order.id, product_key: 'B-12345', qty: 5 ,unit_weight: 1, total_weight: 5});
                        db.models.Orderitem.create({UserId: user.id, OrderId: order.id, product_key: 'C-12345', qty: 1 ,unit_weight: 5, total_weight: 5});
                        db.models.Orderitem.create({UserId: user.id, OrderId: order.id, product_key: 'D-12345', qty: 2 ,unit_weight: 4, total_weight: 8});
                        db.models.Orderitem.create({UserId: user.id, OrderId: order.id, product_key: 'E-12345', qty: 3 ,unit_weight: 3, total_weight: 9});
                      });
                    });
                    db.models.Account.create({UserId: user.id, description: 'George Cukor', address: 'Via Roma', location: 'Milano'})
                    .then(account => {
                      db.models.Order.create({UserId: user.id, AccountId: account.id, order_num: 'X2C3'})
                      .then(order => {
                        db.models.Orderitem.create({UserId: user.id, OrderId: order.id, product_key: 'A-12345', qty: 5 ,unit_weight: 1, total_weight: 5});
                        db.models.Orderitem.create({UserId: user.id, OrderId: order.id, product_key: 'B-12345', qty: 1 ,unit_weight: 5, total_weight: 5});
                        db.models.Orderitem.create({UserId: user.id, OrderId: order.id, product_key: 'C-12345', qty: 2 ,unit_weight: 4, total_weight: 8});
                        db.models.Orderitem.create({UserId: user.id, OrderId: order.id, product_key: 'D-12345', qty: 3 ,unit_weight: 3, total_weight: 9});
                        db.models.Orderitem.create({UserId: user.id, OrderId: order.id, product_key: 'E-12345', qty: 4 ,unit_weight: 2, total_weight: 8});
                      });
                    });
                    db.models.Account.create({UserId: user.id, description: 'Francis Ford Coppola', address: 'Viale dei Giardini', location: 'Milano'})
                    .then(account => {
                      db.models.Order.create({UserId: user.id, AccountId: account.id, order_num: 'C3V4'})
                      .then(order => {
                        db.models.Orderitem.create({UserId: user.id, OrderId: order.id, product_key: 'A-12345', qty: 1 ,unit_weight: 5, total_weight: 5});
                        db.models.Orderitem.create({UserId: user.id, OrderId: order.id, product_key: 'B-12345', qty: 2 ,unit_weight: 4, total_weight: 8});
                        db.models.Orderitem.create({UserId: user.id, OrderId: order.id, product_key: 'C-12345', qty: 3 ,unit_weight: 3, total_weight: 9});
                        db.models.Orderitem.create({UserId: user.id, OrderId: order.id, product_key: 'D-12345', qty: 4 ,unit_weight: 2, total_weight: 8});
                        db.models.Orderitem.create({UserId: user.id, OrderId: order.id, product_key: 'E-12345', qty: 5 ,unit_weight: 1, total_weight: 5});
                      });
                    });
                  });
                });

              });
            });
          });
        });
      });
    });

    console.log(' ');
    console.log('=====>>>>> END initdata');
    console.log(' ');
  }
}
