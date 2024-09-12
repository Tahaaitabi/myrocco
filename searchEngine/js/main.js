// Elements
const searchRes = document.getElementById('searchResults');
const searchInput = document.getElementById('search-input');

// Event Handlers
searchInput.addEventListener("blur", (e) => {
  searchRes.style.display = "none";
});
searchInput.addEventListener("input", (e) => {
  let query = e.target.value.trim().toLowerCase();
  if (query.length > 0) {
    startSearch(query);  // Pass the query dynamically
  } else {
    console.log('Enter something to search...');
  }
});

const startSearch = (query) => {
  fetch('../json/regions.json')
    .then(res => res.json())
    .then(data => {
      const regions = data.Regions;
      let result = [];

      // Helper function to build the path using parent key names
      const getObject = (arr, parentPath = "", parentKey = "") => {
        if (Array.isArray(arr)) {
          arr.forEach(item => {
            // Dynamically generate current path based on available key names
            const currentName = item.Name || item.Province || item.id;  // Fallback to id if Name/Province is not available
            const currentPath = parentPath ? `${parentPath} > ${parentKey} > ${currentName}` : currentName;

            // Check for string matches
            for (const key in item) {
              if (typeof item[key] === 'string' && item[key].toLowerCase().includes(query)) {
                // Check if this combination of path and item is already in result (avoid duplicates)
                if (!result.some(existingItem => existingItem.path === currentPath)) {
                  result.push({ ...item, path: currentPath });  // Store item with its unique path
                  //                 console.log(item);  // Log matching object
                }
              }

              // Recursively check nested objects and pass the current path + current key
              if (typeof item[key] === 'object') {
                getObject(item[key], currentPath, key);  // Pass key as the parentKey
                return
              }
            }
          });
        }
      };

      getObject(regions);
      console.log(`Filtered Results with '${query}':`, result);
    });
};

