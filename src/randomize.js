// симулятор ошибок
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
const randomizeError = () => {
    const random = getRandomInt(100);
    
    if (random > 90) {
        return new Error('Bad Request');
    }
    
    return null;
};
const randomizeErrorPromise = (reject) => {
    const random = getRandomInt(100);
    
    if (random > 90) {
        reject('Bad Request');
    }
    
    return null;
};