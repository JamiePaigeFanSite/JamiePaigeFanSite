// Store full search results for filtering
let fullSearchResults = [];
let currentSearchQuery = '';

// Fetch and search a single file
async function searchFile(fileEntry, query) {
  try {
    const basePath = window.location.pathname.includes('/JamiePedia/') ? '/JamiePedia' : '';
    const response = await fetch(basePath + fileEntry.path);
    if (!response.ok) return null;
    
    const html = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    
    // Classes to exclude from search
    const excludeClasses = [
      'song-tabs-container',
      'song-length',
      'lyrics-subtab',
      'album-tab',
      'song-tabs',
      'version-tab',
      'album-tabs-container',
      'album-tabs',
      'song-nav-buttons',
      'back-button',
      'references-section',
      'song-info-label',
      'cover-art-footer'
    ];
    
    // Remove excluded elements
    excludeClasses.forEach(className => {
      doc.querySelectorAll('.' + className).forEach(el => {
        el.remove();
      });
    });
    
    // Extract text with <br> replaced by visual space bar
    let textWithBrMarkers = '';
    if (doc.body) {
      const walker = doc.createTreeWalker(doc.body, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT, null);
      let node;
      while (node = walker.nextNode()) {
        if (node.nodeType === Node.TEXT_NODE) {
          textWithBrMarkers += node.textContent;
        } else if (node.nodeName === 'BR') {
          textWithBrMarkers += ' ';
        }
      }
      textWithBrMarkers = textWithBrMarkers.replace(/\s+/g, ' ').trim();
    }
    
    const lowerTextWithBr = textWithBrMarkers.toLowerCase();
    const lowerQuery = query.toLowerCase();
    
    if (lowerTextWithBr.includes(lowerQuery)) {
      // Extract cover art image
      let coverSrc = basePath + '/public/images/cover-art/as.png'; // default fallback
      
      // Try to find cover image from songs (album-art-image ID)
      const coverImg = doc.getElementById('album-art-image');
      if (coverImg && coverImg.getAttribute('src')) {
        let imagePath = coverImg.getAttribute('src');
        // Prepend basePath to absolute paths
        if (imagePath.startsWith('/') && !imagePath.startsWith(basePath)) {
          coverSrc = basePath + imagePath;
        } else {
          coverSrc = imagePath;
        }
      } else {
        // Try to find cover image from album pages (album-cover-container class)
        const albumCoverContainer = doc.querySelector('.album-cover-container img');
        if (albumCoverContainer && albumCoverContainer.getAttribute('src')) {
          let imagePath = albumCoverContainer.getAttribute('src');
          // Resolve relative paths from the file's location
          if (!imagePath.startsWith('/')) {
            const fileDir = fileEntry.path.substring(0, fileEntry.path.lastIndexOf('/'));
            imagePath = fileDir + '/' + imagePath;
            // Resolve ../ references
            const parts = imagePath.split('/');
            const resolved = [];
            for (const part of parts) {
              if (part === '..') {
                resolved.pop();
              } else if (part !== '.' && part !== '') {
                resolved.push(part);
              }
            }
            coverSrc = basePath + '/' + resolved.join('/');
          } else {
            // Absolute path - prepend basePath if needed
            if (!imagePath.startsWith(basePath)) {
              coverSrc = basePath + imagePath;
            } else {
              coverSrc = imagePath;
            }
          }
        }
      }
      
      // Extract title from page content (song-title or h1)
      let title = '';
      const songTitle = doc.querySelector('.song-title');
      if (songTitle) {
        title = songTitle.textContent.trim();
      } else {
        const h1 = doc.querySelector('h1');
        if (h1) {
          title = h1.textContent.trim();
        }
      }
      
      // Fallback to filename-derived title if no title found
      if (!title) {
        title = fileEntry.path.split('/').pop().replace('.html', '').replace(/-/g, ' ');
      }
      
      // Extract snippet from text with space bar markers for <br>
      const index = lowerTextWithBr.indexOf(lowerQuery);
      const start = Math.max(0, index - 60);
      const end = Math.min(textWithBrMarkers.length, index + lowerQuery.length + 60);
      const snippet = textWithBrMarkers.substring(start, end).trim();
      
      return {
        album: fileEntry.album,
        title: title,
        url: fileEntry.path,
        content: snippet,
        coverSrc: coverSrc,
        hasContentBefore: start > 0,
        hasContentAfter: end < textWithBrMarkers.length
      };
    }
  } catch (e) {
    // File fetch failed, skip
  }
  return null;
}

// Perform search across all site files
async function performSearch(query) {
  const trimmedQuery = query.trim();
  if (!trimmedQuery) {
    return;
  }
  
  const resultsContainer = document.getElementById('searchResults');
  resultsContainer.innerHTML = '<p style="color: #888; text-align: center;">Searching...</p>';
  
  const modal = document.getElementById('searchModal');
  modal.style.display = 'block';
  
  const results = [];
  const searchPromises = musicFilePaths.map(fileEntry => searchFile(fileEntry, trimmedQuery));
  const searchResults = await Promise.all(searchPromises);
  
  searchResults.forEach(result => {
    if (result) {
      results.push(result);
    }
  });
  
  displaySearchResults(results, query);
  
  // Store results and query for filtering
  fullSearchResults = results;
  currentSearchQuery = query;
}

// Display search results in modal
function displaySearchResults(results, originalQuery) {
  const resultsContainer = document.getElementById('searchResults');
  const searchTitle = document.getElementById('searchTitle');
  const resultFilterInput = document.getElementById('resultFilterInput');
  const basePath = window.location.pathname.includes('/JamiePedia/') ? '/JamiePedia' : '';
  
  // Pre-populate the search input with current query
  if (resultFilterInput) {
    resultFilterInput.value = originalQuery;
  }
  
  // Escape special regex characters
  const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const escapedQuery = escapeRegex(originalQuery);
  const queryRegex = new RegExp(`(${escapedQuery})`, 'gi');
  
  resultsContainer.innerHTML = '';
  
  if (results.length === 0) {
    resultsContainer.innerHTML = '<p style="color: #888;">No results found for "' + originalQuery + '"</p>';
    searchTitle.textContent = 'Search Results (0)';
  } else {
    searchTitle.textContent = 'Search Results (' + results.length + ')';
    results.forEach(item => {
      const resultDiv = document.createElement('div');
      resultDiv.style.cssText = 'margin-bottom: 15px; padding: 10px; border: 3px solid #351854; background: #fff; display: flex; gap: 15px; align-items: flex-start; border-radius: 5px;';
      
      const coverImg = document.createElement('img');
      // Ensure absolute paths have basePath prepended for GitHub Pages
      let imgSrc = item.coverSrc;
      if (imgSrc.startsWith('/') && !imgSrc.startsWith(basePath)) {
        imgSrc = basePath + imgSrc;
      }
      coverImg.src = imgSrc;
      coverImg.alt = item.title;
      coverImg.style.cssText = 'width: 80px; height: auto; flex-shrink: 0; border: 1px solid #ddd; border-radius: 2px;';
      
      const contentDiv = document.createElement('div');
      contentDiv.style.cssText = 'flex: 1;';
      const highlightedContent = item.content.replace(queryRegex, '<strong style="background-color: #fffacd; font-weight: bold;">$1</strong>');
      const beforeEllipsis = item.hasContentBefore ? '...' : '';
      const afterEllipsis = item.hasContentAfter ? '...' : '';
      contentDiv.innerHTML = '<div style="font-size: 12px; color: #999; font-weight: bold;">' + item.album + '</div>' +
        '<a href="' + basePath + item.url + '" style="color: #ef8a85; text-decoration: none; font-size: 16px; font-weight: bold;">' + 
        item.title + '</a>' +
        '<p style="margin: 5px 0 0 0; color: #666; font-size: 13px;">' + beforeEllipsis + highlightedContent + afterEllipsis + '</p>';
      
      resultDiv.appendChild(coverImg);
      resultDiv.appendChild(contentDiv);
      resultsContainer.appendChild(resultDiv);
    });
  }
}

// Handle search input changes in modal
function handleModalSearchChange(e) {
  const query = e.target.value.trim();
  if (query) {
    performSearch(query);
  }
}

// Open search modal
function openSearchModal() {
  const query = document.getElementById('searchInput').value.trim();
  performSearch(query);
}

// Close search modal
function closeSearchModal() {
  document.getElementById('searchModal').style.display = 'none';
}

// Handle search button click
function handleSearchClick(e) {
  e.preventDefault();
  openSearchModal();
}

// Initialize search handlers
function initializeSearch() {
  const searchBtn = document.getElementById('searchBtn');
  const closeBtn = document.getElementById('closeSearchModal');
  const modal = document.getElementById('searchModal');
  const searchInput = document.getElementById('searchInput');
  const resultFilterInput = document.getElementById('resultFilterInput');
  
  if (searchBtn) {
    searchBtn.addEventListener('click', handleSearchClick);
  }
  
  if (closeBtn) {
    closeBtn.addEventListener('click', closeSearchModal);
  }
  
  if (modal) {
    // Close modal when clicking outside the modal content
    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        closeSearchModal();
      }
    });
  }
  
  // Allow Enter key to search
  if (searchInput) {
    searchInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        handleSearchClick(e);
      }
    });
  }
  
  // Add event listener for modal search input changes
  if (resultFilterInput) {
    let searchTimeout;
    resultFilterInput.addEventListener('input', function(e) {
      clearTimeout(searchTimeout);
      // Debounce search to avoid excessive searches while typing
      searchTimeout = setTimeout(function() {
        handleModalSearchChange(e);
      }, 300);
    });
  }
}
