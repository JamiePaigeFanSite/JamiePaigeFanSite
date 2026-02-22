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
    'aisr.png': 'Braz_OS',
    'aod.png': 'divvydots',
    'as.png': 'REVERIEQUE',
    'atm.jpg': 'Avi Roberts',
    'aw.jpg': 'Remy Boydell',
    'bb.png': 'Sidoopa',
    'bc.jpg': 'REVERIEQUE',
    'bdkt26.png': 'Kurumitsu',
    'bs.png': 'REVERIEQUE',
    'bv.png': 'ricedeity',
    'bvcc.png': 'ajihaew',
    'bvi.png': 'ricedeity',
    'cb.jpg': 'ODDEEO',
    'cc.png': 'REVERIEQUE',
    'ccde.png': 'REVERIEQUE',
    'ccii.png': 'REVERIEQUE',
    'ccolors.png': 'REVERIEQUE',
    'ccommune.jpg': 'Louie Zong',
    'ccontrepoint.png': 'ajihaew',
    'closer.jpg': 'Jamie Paige',
    'cs.png': 'Catherine G. Erhlhell',
    'ddoll.jpg': 'Crispy6usiness',
    'destiny.jpg': 'Bluffy',
    'dnh.png': 'Skaði Kaos',
    'ds2021.jpg': 'REVERIEQUE',
    'dsc2021.jpg': 'Nou @ CFM',
    'dsc2025.jpg': 'lack @ CFM',
    'ebi.jpg': 'Jamie Paige',
    'encore.jpg': 'REVERIEQUE',
    'erb.png': 'Arusechika',
    'ewz.jpg': 'REVERIEQUE, ricedeity',
    'fire.png': 'angelfaise',
    'ghf.jpg': '',
    'gr.jpg': 'kalrot',
    'hc.jpg': 'citruslucy',
    'hmt.jpg': 'pipiskulle',
    'human.png': 'insertdisc5',
    'iwticf.png': 'BEARVAMPS',
    'jpjp3.png': 'Jamie Paige',
    'jpjp4.png': 'Jamie Paige',
    'jpjp5.png': 'Jamie Paige',
    'jpjp6.png': 'Jamie Paige',
    'loll.jpg': 'worm-suggestion',
    'lr.jpg': 'REVERIEQUE',
    'lt.jpg': 'haru / oomr005',
    'martyoshka.png': 'milkbean',
    'ml.png': 'REVERIEQUE',
    'mm.png': 'Luciel Ellis',
    'nqtsc.jpg': 'Ryoko Kui',
    'of.jpg': 'Fourth Strike Records',
    'otw.jpg': 'nika37',
    'pjscpfp.jpg': 'REVERIEQUE',
    'pmprr.jpg': 'monolarkey',
    'ppiiharaylyhssltl.jpg': '',
    'pppp.png': 'REVERIEQUE',
    'ptpt.jpg': 'Enid, friendxp',
    'qov.jpg': 'sferics32',
    'qovcc.png': 'ajihaew',
    'r4c.png': 'ricedeity',
    'rd.jpg': 'pierrotsdoll',
    'rdcc.jpg': 'ajihaew',
    'ride.jpg': 'LulunaRina',
    'rotjpa.jpg': 'ODDEEO',
    'rr.jpeg': 'vippori',
    'sd.png': 'Cochet',
    'sf.png': 'hoshizorelone',
    'sfrr.jpg': 'ajihaew',
    'smots.png': 'SoftySapphie',
    'srid.png': 'nika37',
    'static.jpg': 'ricedeity',
    'su.png': 'Jamie Lee',
    'tia.jpg': 'TheRyDesign',
    'tpoc.jpg': '?',
    'vhs.png': 'BEARVAMPS',
    'virtue.jpg': 'Cochet V.',
    'vvff.png': 'retrotenn',
    'vvjp.png': 'retrotenn',
    'wg.jpg': 'ippo.tsk',
    'wgcc.jpg': 'ajihaew',
    'wscrr.jpg': 'REVERIEQUE',
    'wtr.jpg': 'Edlinklover',
    'wtrcc.jpg': 'ajihaew',
    'ww.jpg': 'BEARVAMPS',
    'wwr.jpg': 'kheechuu',
    'wwrcc.jpg': 'ajihaew',
  };
  document.getElementById('cover-artist-display').textContent = coverArtists[filename] || 'Jamie Paige';
}

function previousSong() {
  alert('Previous song functionality to be implemented');
}

function nextSong() {
  alert('Next song functionality to be implemented');
}
