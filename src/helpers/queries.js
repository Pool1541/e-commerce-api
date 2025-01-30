const searchByKeywordQuery = (keyword) => {
  const regex = new RegExp(keyword, 'i');
  return {
    $or: [{ title: regex }, { brand: { $regex: regex } }],
  }
}

module.exports = {
  searchByKeywordQuery,
};