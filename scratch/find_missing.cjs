const https = require('https');

const missing = [
  'John Wick 4',
  'The Batman',
  'Avatar Way of Water',
  'Uncharted',
  'Jungle Cruise',
  'Dune 2',
  'Glass Onion',
  'The Whale'
];

missing.forEach(q => {
  https.get('https://chill.phim.city/tim-kiem?q='+encodeURIComponent(q), {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      'Referer': 'https://chill.phim.city/'
    }
  }, res => {
    let d='';
    res.on('data', c=>d+=c);
    res.on('end', () => {
      const regex = /href="\/phim-le\/([^"]+)"/g;
      const slugs = new Set();
      let m;
      while ((m = regex.exec(d)) !== null) slugs.add(m[1]);
      console.log(`[${q}] =>`, Array.from(slugs).slice(0, 5));
    });
  });
});
