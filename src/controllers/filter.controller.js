const { request, response } = require('express');
const { filterArrayAsync } = require('../helpers/filterArrayAsync');
const { searchByKeywordQuery } = require('../helpers/queries');

const getFilters = async (req = request, res = response) => {
  try {
    const { filters, category, keyword } = req.query;

    const filterQuery = keyword ? searchByKeywordQuery(keyword) : { category };
    const filterArray = filters.split(',');
    const results = await filterArrayAsync(filterArray, filterQuery);

    res.status(200).json(results);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

module.exports = {
  getFilters,
};
