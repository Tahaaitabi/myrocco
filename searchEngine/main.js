//Elements
const searchRes = document.getElementById('searchResults');
const searchInput = document.getElementById('search-input');
//Event Handlers
searchInput.addEventListener("blur", (e) => {
  searchRes.style.display = "none";
});
searchInput.addEventListener("input", (e) => {
  searchQuery = e.target.value;
  if (searchQuery !== '') {
    searchRes.style.display = "flex";
    searchRes.innerHTML = searchQuery
  }
});
//Variables
let searchQuery = '';
let regionNames = [];
let regionData = [];
let regionSubdivs = [];
//Fetch
fetch("../json/regions.json")
  .then(res => res.json())
  .then(data => {
    const regions = data.Regions;
    //Level 1 keys:
    //Region Names:
    let rN = [];
    Object.keys(rN.push(regions))[0]
    //Pushes the keys containing the names of the regions to the globally accessibly array 'regionNames'.
    pushKeys(rN,regionNames)
    //Level 1 values:
    let gON = [];
    let sM = [];
    gON.push(Object.values(regions)[0]['Guelmim-Oued Noun']);
    pushEntries(gON, regionData);
    sM.push(Object.values(regions)[1]['Sous-Massa']);
    pushEntries(sM, regionData);
    //Level 2 values:
    let subDivs = [];
    Object.keys(subDivs.push(gON[0][0].Subdivisions))
    pushEntries(subDivs,regionSubdivs)
    console.log(regionSubdivs)
  });
// For Loops:
// Push region Names
pushKeys = (array, globalArray) => {
  for (let i = 0; i < array.length; i++) {
    array[i].forEach(i => {
      globalArray.push(Object.keys(i)[0])
    });
  };
};
// Push region Data: 
pushEntries = (array, globalArray) => {
  for (let i = 0; i < array.length; i++) {
    globalArray.push(Object.entries(array[i][0]))
  };
};
