const getUsersPromise = (userID) => {
    return new Promise( (resolve, reject) => {
        const USERS = [
            {id: 1, name: 'Bob'},
            {id: 2, name: 'Andy'},
            {id: 3, name: 'John'},
        ];
  
        setTimeout(() => {
            randomizeErrorPromise(reject);
            resolve(findItemsByKeynameValues(USERS, 'id', [userID]));
        }, 2000);
    })
};
const getProductsPromise = (orders) => {
    return new Promise( (resolve, reject) => {
        const PRODUCTS = [
            {id: 1, name: 'iPad'},
            {id: 2, name: 'Google Pixel'},
            {id: 3, name: 'War and Peace'},
            {id: 4, name: 'iPad'},
            {id: 5, name: 'Kaizen'},
            {id: 6, name: 'Sherlock Holmes'},
        ];
  
        setTimeout(() => {
            randomizeErrorPromise(reject);

            for (const element of orders) {
                element.checkout = findItemsByKeynameValues(PRODUCTS, 'id', element.checkout);
            }
            resolve(orders);
        }, 2000);
    })
};
const getOrdersPromise = (userID) => {
    return new Promise( (resolve, reject) => {
        const ORDERS = [
            {id: 1, userId: 1, checkout: [1, 6]},
            {id: 2, userId: 1, checkout: [3]},
            {id: 3, userId: 2, checkout: [2, 4]},
        ];
  
        setTimeout(() => {
            randomizeErrorPromise(reject);
            resolve(findItemsByKeynameValues(ORDERS, 'userId', [userID]));
        }, 2000);
    });
};

const errorPromise = (message) => {
    return new Promise((resolve, reject) => {
        reject(message);
    });
};

const getCheckoutsForUserAsPromise = (userID) => {
    return new Promise((resolve) => {
        resolve(getUsersPromise(userID));
    });
}

getCheckoutsForUserAsPromise(1)
    .then(user => {
        return user === null 
            ? errorPromise('User is not found') 
            : getOrdersPromise(user[0].id);
    })
    .then(orders => {
        return orders === null 
            ? errorPromise('User has not added any orders yet') 
            : getProductsPromise(orders);
    })
    .then(data => {
        data.forEach(el => {
            console.log(el);
        })
    })
    .catch(error => {
        console.error(error);
    });
    
    




