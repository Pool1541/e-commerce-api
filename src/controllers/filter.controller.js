const { request, response } = require("express");
const { filterArrayAsync } = require("../helpers/filterArrayAsync");

const getFilters = async (req = request, res = response) => {
  try {
    const { filters } = req.query;

    const filterArray = filters.split(",");
    const results = await filterArrayAsync(filterArray);

    res.status(200).json(results);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Something went wrong" });
  }
};

module.exports = {
  getFilters,
};
