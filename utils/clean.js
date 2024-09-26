const clean = (arr) => {
  if (Array.isArray(arr)) {
    arr.forEach(item => {
      if (item.hasOwnProperty('Subdivision')) {
        let newSubdiv = [];
        let subdiv =  item.Subdivision
        if (Array.isArray(subdiv)) {
          subdiv.forEach(item => {
            for (const key in item) {
              let value = item[key]
              newSubdiv.push(key)
            }
          })
        }
        item.Subdivision = newSubdiv;
      } else if (item.hasOwnProperty('Subdivisions')) {
        let subdiv =  item.Subdivisions
        let newSubdivs = [];
        if (Array.isArray(subdiv)) {
          subdiv.forEach(item => {
            for (const key in item) {
              let value = item[key]
              newSubdivs.push(key)
            }
          })
        }
        item.Subdivisions = newSubdivs;
      }
    })
    return arr
  }
}
module.exports = clean;
