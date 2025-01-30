const Product = require('../models/product');

async function filterArrayAsync(filterArray, filterQuery) {
  const promises = filterArray.map(async (curr) => {
    let filterObject = {};

    if (curr === 'maxPrice') {
      const filtersPromise = Product.findOne(filterQuery).sort('-price').exec();
      filterObject.title = curr;
      const result = await filtersPromise;
      filterObject.filterList = [result.price];

      return filterObject;
    }
    const filtersPromise = Product.distinct(curr, filterQuery);
    filterObject.title = curr;
    filterObject.filterList = await filtersPromise;

    return filterObject;
  });

  const results = await Promise.all(promises);
  return results;
}

module.exports = {
  filterArrayAsync,
};
