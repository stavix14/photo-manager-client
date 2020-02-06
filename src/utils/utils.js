const ratingCalculation = ratings => ratings.reduce((acc, rating) => acc + rating) / ratings.length;

export default ratingCalculation;