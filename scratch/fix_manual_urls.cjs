const fs = require('fs');
const https = require('https');

const MANUAL_SLUGS = {
  'john-wick-4': 'sat-thu-john-wick-phan-4',
  'the-batman': 'nguoi-doi-vach-tran-su-that',
  'avatar-2': 'avatar-2-dong-chay-cua-nuoc',
  'uncharted': 'tho-san-co-vat',
  'jungle-cruise': 'jungle-cruise-tham-hiem-rung-xanh',
  'dune-2': 'hanh-tinh-cat-phan-hai',
  'glass-onion': 'ke-dam-len-glass-onion',
  'the-whale': 'ca-voi'
};

function fetchUrl(path) {
  return new Promise((resolve) => {
    const req = https.request({
      hostname: 'chill.phim.city',
      path: encodeURI(path),
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml',
        'Referer': 'https://chill.phim.city/',
      }
    }, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve({ status: res.statusCode, body: data }));
    });
    req.on('error', () => resolve({ status: 0, body: '' }));
    req.setTimeout(8000, () => { req.destroy(); resolve({ status: 408, body: '' }); });
    req.end();
  });
}

function extractEmbed(body) {
  const patterns = [
    /["'](https?:\/\/play\.123embed\.net\/[^"']+)["']/i,
    /<iframe[^>]+src=["']([^"']*123embed[^"']*)["']/i,
    /["'](https?:\/\/[^"']*embed[^"']*\/mv\/\d+[^"']*)["']/i,
  ];
  for (const p of patterns) {
    const m = body.match(p);
    if (m) return m[1];
  }
  return null;
}

async function main() {
  const filePath = 'src/data/movies.json';
  const movies = JSON.parse(fs.readFileSync(filePath));
  let updatedCount = 0;

  for (const [id, slug] of Object.entries(MANUAL_SLUGS)) {
    const movie = movies.find(m => m.id === id);
    if (!movie) {
      console.log(`Movie ID ${id} not found in movies.json`);
      continue;
    }

    process.stdout.write(`Fetching ${slug}... `);
    const page = await fetchUrl(`/phim-le/${slug}`);
    
    if (page.status === 200) {
      const embedUrl = extractEmbed(page.body);
      if (embedUrl) {
        movie.fullMovieUrl = embedUrl;
        console.log(`✓ ${embedUrl}`);
        updatedCount++;
      } else {
        console.log(`✗ Embed URL not found in HTML`);
      }
    } else {
      console.log(`✗ HTTP ${page.status}`);
    }
    
    await new Promise(r => setTimeout(r, 500));
  }

  if (updatedCount > 0) {
    fs.writeFileSync(filePath, JSON.stringify(movies, null, 2));
    console.log(`\nSuccessfully updated ${updatedCount} streams in movies.json`);
  }
}

main().catch(console.error);
