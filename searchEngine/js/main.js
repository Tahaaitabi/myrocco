// Elements
const searchRes = document.getElementById('searchResults');
const searchInput = document.getElementById('search-input');

//Helper functions
const display = (item) => {
  searchRes.style.display = "flex";
  if (typeof item === 'object' && item !== null) {
      searchRes.innerHTML = '';
    const match = document.createElement("div")
      searchRes.innerHTML = `<p><a href="#" id="resultLink">${JSON.stringify(item)}</a></p>`;
  }
}

// Event Handlers
searchInput.addEventListener("keydown", (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
  }
});

searchInput.addEventListener("input", (e) => {
  let query = e.target.value.trim().toLowerCase();
  if (query.length > 0) {
    startSearch(query);  // Pass the query dynamically
  } else {
    console.log('Enter something to search...');
    searchRes.innerHTML = '';
    searchRes.style.display = "none";
  }
});

// startSearch function
const startSearch = (query) => {
  fetch('../json/regions.json')
    .then(res => res.json())
    .then(data => {
      const regions = data.Regions;
      let result = [];
      const getData = (obj) => {
        if (typeof obj === 'object' && obj !== null) {
          if (!Array.isArray(obj)) {
            for (const prop in obj) {
              let entry = obj[prop];
              if (typeof entry === 'string' && entry.toLowerCase().includes(query)) {
                if (!result.some(match => JSON.stringify(match) === JSON.stringify(obj))) {
                  result.push(obj);
                }
              }
              getData(entry);
            }
          } else {
            obj.forEach(array => {
              getData(array);
            });
          }
        }
      }
      getData(regions);
      searchRes.innerHTML = '';
      result.forEach(item => {
        display(item);
      });
    });
}
