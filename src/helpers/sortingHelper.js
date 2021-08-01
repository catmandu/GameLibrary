
const SortByValue = (list, propName = 'name') =>
{
    if(typeof propName === 'string')
    {
        return _SortByString(list, propName);
    }

    return list.sort();
};

const _SortByString = (list, propName) =>
{
    return list.sort((a,b) => {
        var x = a[propName].toLowerCase();
        var y = b[propName].toLowerCase();
        if(x < y) return -1;
        if(x > y) return 1;
        return 0;
      });  
};

module.exports = { 
    SortByValue
};