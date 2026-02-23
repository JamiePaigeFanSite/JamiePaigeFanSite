// Determine base path - detect GitHub Pages subdirectory
const pathname = window.location.pathname;
const basePath = pathname.includes('/JamiePedia/') ? '/JamiePedia' : '';

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

$(function(){
  // Load local include fragments
  $("#navi").load(basePath + "/assets/static/navibar.html");
  $("#sidebar").load(basePath + "/assets/static/sidebar.html");
  $("#linkbox").load(basePath + "/assets/static/linkbox.html", function() {
    // After jQuery loads content, add icons to any new links
    if (typeof addSocialMediaIcons === 'function') {
      addSocialMediaIcons();
    }
  });
});