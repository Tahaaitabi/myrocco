//Elements
const searchRes = document.getElementById('searchResults');
const searchInput = document.getElementById('search-input');
let query = '';
//Event Handlers
searchInput.addEventListener("blur", (e) => {
  searchRes.style.display = "none";
});
searchInput.addEventListener("input", (e) => {
  let query = e.target.value;

});
fetch('../json/regions.json')
  .then(res => res.json())
  .then(data => {
    const regions = data.Regions;
    /* const checkVariable = (arrVariable) => {
      if (Array.isArray(arrVariable)) {
        arrVariable.forEach(item => {
          checkVariable(item);
        })
      } else if (typeof arrVariable === 'object' && arrVariable !== null) {
        console.log(`Object = ${arrVariable}`)
        for (const prop in arrVariable) {
          if (arrVariable.hasOwnProperty(prop)) {
            console.log(`Property ${prop} = ${arrVariable[prop]}`)
            checkVariable(arrVariable[prop])
          }
        }
      } else {
        console.log(`${arrVariable} = ${typeof arrVariable}`);
      }
    } */

    getObject = (arr) => {
      if (Array.isArray(arr)) {
        arr.forEach(item => {
          for (const object in item) {
            if (item.Name === 'Sidi-Ifni'){
              console.log(item)
              return
            }
            getObject(item[object])
          }
        })
      } 
    }
    getObject(regions)
  });
