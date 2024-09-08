//Elements
const searchRes = document.getElementById('searchResults');
const searchInput = document.getElementById('search-input');
//Event Handlers
searchInput.addEventListener("keypress", (e) => {
  if (e.key === 'Enter') {
    let query = '';
    query = searchInput.value;
    console.log(query)
  }
});
//Variables
let searchQuery = '';
let regionNames = [];
let regionData = [];
//Styling
searchRes.style.display = "none";
//Fetch
fetch("../json/regions.json")
  .then(res => res.json())
  .then(data => {
    const regions = data.Regions;
    //Level 1 keys:
    //Region Names:
    let regionNames = [];
    Object.keys(regionNames.push(regions))[0]
    //Pushes the keys containing the names of the regions to the globally accessibly arrray 'regionNames'.
    getRegionName(regionNames)
    //Level 1 values:
    let gON = [];
    let sM = [];
    gON.push(Object.values(regions)[0]['Guelmim-Oued Noun']);
    getRegionData(gON);
    sM.push(Object.values(regions)[1]['Sous-Massa']);
    getRegionData(sM);
  });
// For Loops:
// Get Region Names
getRegionName = (array) => {
  for (let i = 0; i < array.length; i++) {
    array[i].forEach(i => {
      regionNames.push(Object.keys(i)[0]);
    });
  };
};
// Get Region Data: 
getRegionData = (array) => {
  for (let i = 0; i < array.length; i++) {
    regionData.push(Object.entries(array[i][0]))
  }
}
