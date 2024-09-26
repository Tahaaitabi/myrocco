const Regions = require('../models/regionsModel');

async function getAllRegions(req, res) {
  try {
    const regions = await Regions.findAll();

    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(regions));
  } catch (error) {
    console.log(error)
  }
}

module.exports = {getAllRegions};
