const regions = require('./regions.json');
const clean = require('./utils/clean');

// Uncomment to test locally with the CLI 
let query = process.argv.slice(2);
query = query.join(" ").toLowerCase();

const search = (query, object, where = null, tempResult = [], result = []) => {
  if (query.length === 0) {
    console.error(`Your query is empty! \nPlease type a word to search for in the Database!`)
    process.exit(1)
  }

  if (Array.isArray(object)) {
    object.forEach(item => {
      search(query, item, where, tempResult, result);
    })
  } else {
    if (typeof object === 'object' && object !== null) {
      for (const key in object) {
        let value = object[key];
        if (typeof value === 'string' && value.toLowerCase().includes(query)) {
          if (!tempResult.some(match => JSON.stringify(match) === JSON.stringify(object))) {
            tempResult.push(object);
            result.push({...object, Type: where});
          }
        } else {
          search(query, value, key, tempResult, result);
        }
      }
    }
  }
  return result
}
const data = search(query, regions)
const cleaned = clean(data)
console.log(cleaned)
// Export the search function , result array and the query
module.exports = { search, regions};
