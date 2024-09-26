// Elements
const searchRes = document.getElementById('searchResults');
const searchInput = document.getElementById('search-input');

//Helper functions
const display = (item, query) => {
  if (query.length === 0) {
    searchRes.style.display = "none";
  } else {
    searchRes.style.display = "flex";
    if (typeof item === 'object' && item !== null) {
      let title = '';
      for (const key in item) {
        if (typeof item[key] === 'string' && item[key].toLowerCase().includes(query)) {
          title = item[key];
          break
        }
      }
      //add the title as the first key that matches the query
      const match = document.createElement("div");
      match.classList.add("result-container");
      match.innerHTML = `<p class="result-row">${title}</p>`;
      //add the rest of the information
      const info = document.createElement("ul");
      info.classList.add("result-info");

      for(const key in item) {
        let value; 
        if (key !== title) {
          const infoItem = document.createElement("li");
          value = item[key];
          if (Array.isArray(value)){
            value = Object.keys(value[0])
            value = value.join(" & ", value)
          }
          infoItem.innerHTML = `<span class="key">${key}</span>: <span class="value">${value}</span>`;
          info.appendChild(infoItem)
        }
      }
      match.appendChild(info);
      searchRes.appendChild(match);
    }
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
  fetch(`/api/search?search=${encodeURIComponent(query)}`)
    .then(res => res.json())
    .then(data => {
      searchRes.innerHTML = '';
      data.forEach(item => {
        display(item, query);
      });
    })
  .catch(err => console.error('Error fetching search results', err));
};
