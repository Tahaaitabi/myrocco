const regions = require('../regions');

function findAll() {
  return new Promise((resolve, reject) => {
    resolve(regions)
  })
}

module.exports = {findAll};
