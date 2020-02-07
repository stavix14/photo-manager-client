export const ratingCalculation = ratings => ratings.reduce((acc, rating) => acc + rating) / ratings.length;

export const sortAscending = (a, b, key) => {
    if(a[key].toLowerCase() < b[key].toLowerCase()) { return -1; }
    if(a[key].toLowerCase() > b[key].toLowerCase()) { return 1; }   
    return 0;
};