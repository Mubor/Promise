 
// симулятор запроса в БД в таблицу юзеров.
const getUsers = (callback) => {
    const USERS = [
      {id: 1, name: 'Bob'},
      {id: 2, name: 'Andy'},
      {id: 3, name: 'John'},
    ];
  
    setTimeout(() => {
      callback(randomizeError(), USERS);
    }, 2000);
};
  
  // симулятор запроса в таблицу продуктов.
const getProducts = (callback) => {
    const PRODUCTS = [
      {id: 1, name: 'iPad'},
      {id: 2, name: 'Google Pixel'},
      {id: 3, name: 'War and Peace'},
      {id: 4, name: 'iPad'},
      {id: 5, name: 'Kaizen'},
      {id: 6, name: 'Sherlock Holmes'},
    ];
  
    setTimeout(() => {
      callback(randomizeError(), PRODUCTS);
    }, 2000);
};
  
  // симулятор запроса в таблицу заказов.
const getOrders = (callback) => {
    const ORDERS = [
      {id: 1, userId: 1, checkout: [1, 6]},
      {id: 2, userId: 1, checkout: [3]},
      {id: 3, userId: 2, checkout: [2, 4]},
    ];
  
    setTimeout(() => {
      callback(randomizeError(), ORDERS);
    }, 2000);
};

  const getCheckoutsForUserID = (userID) => {
    let info = {};
    getUsers((error, users) => {
      try {
        if (!error) {
          const user = findItemsByKeynameValues(users, 'id', [userID])
          info = user;

          getOrders((error, orders) => {
            if (!error) {
              const order = findItemsByKeynameValues(orders, 'userId', [userID]);
              const checkouts = order.checkouts;

              getProducts((error, products) => {
                if (!error) {

                  for (const element of order) {
                    element.checkout = findItemsByKeynameValues(products, 'id', element.checkout);
                  }

                  info.items = order;
                  console.log(info);

                } else {
                  throw error;
                }
              });
              if( order === null ) {
                throw new 'User has not added any orders yet'();
              }
            } else {
              throw error;
            }
          });
          if (user === null) {
            throw new 'User is not found'();
          }
        } else {
          throw error;
        }
      }
      catch(error) {
        console.error(error);
      }
    });  
};


