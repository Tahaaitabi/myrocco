const {search, regions} = require('../models/searchModel');
const clean = require('../utils/clean');

const searchRegions = (req, res) => {
  const query = req.query
  if (!query || typeof query !== 'string') {
    res.writeHead(401, {'Content-Type':'application/json'});
    return res.end(JSON.stringify({"Error": "Search query is required!"}));
  }

  const data = search(query.toLowerCase(), regions);
  //const cleaned = clean(data)

  res.writeHead(200, {'Content-Type':'application/json'});
  res.end(JSON.stringify(data));
}

module.exports = searchRegions;
