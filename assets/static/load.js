// Determine base path - detect GitHub Pages subdirectory
const pathname = window.location.pathname;
const basePath = pathname.includes('/JamiePedia/') ? '/JamiePedia' : '';

// Navigate to a song with proper base path
function goToSong(relativePath) {
  window.location.href = basePath + relativePath;
}

$(function(){
  // Load local include fragments
  $("#navi").load(basePath + "/assets/static/navibar.html");
  $("#sidebar").load(basePath + "/assets/static/sidebar.html");
  $("#linkbox").load(basePath + "/assets/static/linkbox.html");
});