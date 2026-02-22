function switchTab(tabName) {
  // Hide all content
  document.querySelectorAll('.song-content').forEach(el => {
    el.classList.remove('active');
  });
  // Remove active state from all tabs
  document.querySelectorAll('.song-tab').forEach(el => {
    el.classList.remove('active');
  });
  // Show selected content
  document.getElementById('content-' + tabName).classList.add('active');
  // Add active state to clicked tab
  event.target.classList.add('active');
}

function switchAlbumArt(filename) {
  // Update the image source
  document.getElementById('album-art-image').src = '../../public/images/cover-art/' + filename;
  // Remove active state from all album art tabs
  document.querySelectorAll('.album-tab').forEach(el => {
    el.classList.remove('active');
  });
  // Add active state to clicked tab
  event.target.classList.add('active');
  
  // Update cover artist based on selected album art
  const coverArtists = {
    'aa.png': 'RJ Lake',
    'aed.png': 'Valerie Halla',
    'aod.png': '',
    'as.png': '',
    'atm.jpg': '',
    'aw.jpg': '',
    'bb.png': '',
    'bc.jpg': '',
    'bdkt26.png': 'Kurumitsu',
    'bs.png': '',
    'bv.png': '',
    'bvcc.png': '',
    'bvi.png': '',
    'cb.jpg': '',
    'cc.png': 'REVERIEQUE',
    'ccde.png': 'REVERIEQUE',
    'ccii.png': '',
    'ccol.png': '',
    'ccomune.jpg': '',
    'ccontrepoint.png': '',
    'closer.jpg': '',
    'cs.png': '',
    'ddoll.jpg': 'Crispy6usiness',
    'destiny.jpg': '',
    'dnh.png': '',
    'ds2021.jpg': '',
    'dsc2021.jpg': '',
    'dsc2025.jpg': '',
    'ebi.jpg': '',
    'encore.jpg': '',
    'erb.png': '',
    'ewz.jpg': '',
    'fire.png': '',
    'ghf.jpg': '',
    'gr.jpg': 'kalrot',
    'hc.jpg': '',
    'hc.jpg': '',
    'hmt.jpg': 'Jun',
    'human.png': '',
    'iwticf.png': '',
    'jpjp3.png': '',
    'jpjp4.png': '',
    'jpjp5.png': '',
    'jpjp6.png': '',
    'loll.jpg': '',
    'lr.jpg': '',
    'lt.jpg': '',
    'martyoshka.png': '',
    'ml.png': 'REVERIEQUE',
    'mm.png': '',
    'nqtsc.jpg': '',
    'of.jpg': '',
    'otw.jpg': '',
    'pjscpfp.jpg': '',
    'pmprr.jpg': '',
    'ppiiharaylyhssltl.jpg': '',
    'pppp.png': '',
    'ptpt.jpg': '',
    'qov.jpg': '',
    'qovcc.png': '',
    'r4c.png': '',
    'rd.jpg': '',
    'rdcc.jpg': '',
    'ride.jpg': '',
    'rotjpa.jpg': '',
    'rr.jpeg': '',
    'sd.png': 'Cochet',
    'sf.png': '',
    'sfrr.jpg': '',
    'smot.png': '',
    'srid.png': '',
    'static.jpg': '',
    'su.png': '',
    'tia.jpg': '',
    'tpoc.jpg': '',
    'vhs.png': '',
    'virtue.jpg': '',
    'vvff.png': '',
    'wg.jpg': '',
    'wgcc.jpg': '',
    'wscrr.jpg': '',
    'wtr.jpg': '',
    'wtrcc.jpg': '',
    'ww.jpg': '',
    'wwr.jpg': '',
    'wwrcc.jpg': '',
  };
  document.getElementById('cover-artist-display').textContent = coverArtists[filename] || 'Jamie Paige';
}

function previousSong() {
  alert('Previous song functionality to be implemented');
}

function nextSong() {
  alert('Next song functionality to be implemented');
}
