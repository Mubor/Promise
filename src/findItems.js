const findItemsByKeynameValues = (data, keyname, values) => {
  
    let result = [];
    let haveUndefinedValue = false;

    //Поиск объектов в массиве, которые содержат keyname: value[i];
    values.forEach( el => {
      data.forEach( object => {
        if( object[keyname] === el ) {
          result.push(object);
        } 
      })
    });
    
    //Если массив результатов содержит undefined, возвращает null(в последствии обрабатівается как ошибка)
    result.map( item => haveUndefinedValue = item === undefined ? true : haveUndefinedValue);
    return haveUndefinedValue ? null : result;
};