const https = require('https');

const options = {
  hostname: 'chill.phim.city',
  path: '/phim-le/ky-si-bong-dem',
  method: 'GET',
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.5',
  }
};

const req = https.request(options, (res) => {
  let data = '';
  console.log('Status:', res.statusCode);
  res.on('data', (c) => data += c);
  res.on('end', () => {
    const streamRegex = /(https?:\/\/[^\s\"'>]+\.(m3u8|mp4)[^\s\"'>]*)/gi;
    const iframeRegex = /<iframe[^>]+src=["']([^"']+)["'][^>]*>/gi;
    const embedRegex = /["'](https?:\/\/[^"']*(?:embed|player|stream|cdn)[^"']*?)["']/gi;

    console.log('\n--- STREAMS (m3u8/mp4) ---');
    const streamMatches = data.match(streamRegex);
    if (streamMatches) {
      console.log(Array.from(new Set(streamMatches)).join('\n'));
    } else {
      console.log('None found.');
    }

    console.log('\n--- IFRAMES ---');
    let match;
    const found = new Set();
    while ((match = iframeRegex.exec(data)) !== null) {
      if (!found.has(match[1])) { found.add(match[1]); console.log(match[1]); }
    }
    if (found.size === 0) console.log('None found.');

    console.log('\n--- EMBED/PLAYER URLs ---');
    const found2 = new Set();
    while ((match = embedRegex.exec(data)) !== null) {
      if (!found2.has(match[1]) && !match[1].includes('.css') && !match[1].includes('.js')) {
        found2.add(match[1]); console.log(match[1]);
      }
    }
    if (found2.size === 0) console.log('None found.');
  });
});

req.on('error', (e) => console.error('Error:', e.message));
req.end();
