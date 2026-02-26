// Determine base path - detect GitHub Pages subdirectory
const pathname = window.location.pathname;
const basePath = pathname.includes('/JamiePedia/') ? '/JamiePedia' : '';

// Load music file paths first, then search functionality
const musicFilesScript = document.createElement('script');
musicFilesScript.src = basePath + '/assets/static/music-files.js';
musicFilesScript.onload = function() {
  const searchScript = document.createElement('script');
  searchScript.src = basePath + '/assets/static/search.js';
  searchScript.onload = function() {
    // Initialize search after navibar loads
    $(function(){
      $("#navi").load(basePath + "/assets/static/navibar.html", function() {
        if (typeof initializeSearch === 'function') {
          initializeSearch();
        }
      });
      $("#sidebar").load(basePath + "/assets/static/sidebar.html");
      $("#linkbox").load(basePath + "/assets/static/linkbox.html", function() {
        // After jQuery loads content, add icons to any new links
        if (typeof addSocialMediaIcons === 'function') {
          addSocialMediaIcons();
        }
      });
    });
  };
  document.head.appendChild(searchScript);
};
document.head.appendChild(musicFilesScript);

// Load social icons stylesheet
const socialIconsLink = document.createElement('link');
socialIconsLink.rel = 'stylesheet';
socialIconsLink.href = basePath + '/css/social-icons.css';
document.head.appendChild(socialIconsLink);

// Load social icons script
const socialIconsScript = document.createElement('script');
socialIconsScript.src = basePath + '/assets/static/social-icons.js';
document.head.appendChild(socialIconsScript);

// Navigate to a song with proper base path
function goToSong(relativePath) {
  window.location.href = basePath + relativePath;
}