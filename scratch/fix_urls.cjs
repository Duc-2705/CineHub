const fs = require('fs');
const https = require('https');

// Reliable YouTube Trailers
const trailers = {
  'top-gun-maverick': 'qSqVVswa420',
  'john-wick-4': 'qEVUtrk8_B4',
  'mi-dead-reckoning': 'avz06PDqDbM',
  'the-batman': 'mqqft2x_Aa4',
  'avatar-2': 'd9MyW72ELq0',
  'uncharted': 'eHp3MbsCbMg',
  'jungle-cruise': 'f_HvoipFcA8',
  'dune-2': 'Way9Dexny3w',
  'barbie': 'pBk4NYhWNMM',
  'glass-onion': 'gj5ibYSz8C0',
  'mario-movie': 'TnGl01FkMMo',
  'ticket-to-paradise': 'hkP4tVTvNiY',
  'oppenheimer': 'uYPbbksJxIg',
  'eeaao': 'wxN1T1uxQ2g',
  'the-whale': 'nWiQodhMvz4',
  'elvis': 'wBgiEQBWZMg',
  'm3gan': 'BRb4U99OU80',
  'black-phone': '3eGP6imznKE',
  'smile': 'BcDK7lkzzsU',
  'scream-6': 'h74AXqw4Opc'
};

function fetchUrl(path) {
  return new Promise((resolve) => {
    const req = https.request({
      hostname: 'chill.phim.city',
      path: encodeURI(path),
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
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

function extractSlugsFromSearch(body) {
  const regex = /href=["']\/phim-le\/([a-z0-9\-]+)["']/gi;
  const slugs = new Set();
  let m;
  while ((m = regex.exec(body)) !== null) slugs.add(m[1]);
  return Array.from(slugs);
}

// Special cases mapping English titles to Vietnamese slugs based on common phim.city naming
const SLUG_HINTS = {
  'top-gun-maverick': ['phi-cong-sieu-dang-maverick', 'top-gun-maverick'],
  'john-wick-4': ['sat-thu-john-wick-4', 'john-wick-chuong-4'],
  'mi-dead-reckoning': ['nhiem-vu-bat-kha-thi-7', 'nhiem-vu-bat-kha-thi-nghiep-bao-phan-1'],
  'the-batman': ['nguoi-doi', 'the-batman'],
  'avatar-2': ['avatar-2-dong-nuoc', 'avatar-dong-nuoc'],
  'uncharted': ['uncharted-kho-bau-bi-an', 'kho-bau-bi-an'],
  'jungle-cruise': ['jungle-cruise-thanh-pho-vang-bi-mat', 'thanh-pho-vang-bi-mat', 'jungle-cruise'],
  'dune-2': ['hanh-tinh-cat-phan-2', 'dune-phan-2'],
  'barbie': ['barbie', 'bup-be-barbie'],
  'glass-onion': ['glass-onion-bi-an-dao-hanh-tay', 'ke-dam-len-2'],
  'mario-movie': ['anh-em-super-mario', 'phim-anh-em-super-mario'],
  'ticket-to-paradise': ['tam-ve-den-thien-duong'],
  'oppenheimer': ['oppenheimer'],
  'eeaao': ['cuoc-chien-da-vu-tru'],
  'the-whale': ['the-whale', 'nguoi-ca-voi'],
  'elvis': ['elvis'],
  'm3gan': ['m3gan', 'bup-be-sat-nhan'],
  'black-phone': ['dien-thoai-den', 'the-black-phone'],
  'smile': ['smile', 'cuoi'],
  'scream-6': ['scream-6', 'tieng-thet-6']
};

async function main() {
  const filePath = 'src/data/movies.json';
  const movies = JSON.parse(fs.readFileSync(filePath));
  let updatedCount = 0;

  for (let i = 0; i < movies.length; i++) {
    const movie = movies[i];
    
    // 1. Fix Trailer
    if (trailers[movie.id]) {
      movie.trailerUrl = `https://www.youtube.com/embed/${trailers[movie.id]}`;
    }

    // 2. Fix Full Movie URL
    process.stdout.write(`[${i+1}/${movies.length}] Searching ${movie.title}... `);
    let embedUrl = null;

    // A) Try explicit slug hints
    const hints = SLUG_HINTS[movie.id] || [];
    for (const hint of hints) {
      const page = await fetchUrl(`/phim-le/${hint}`);
      if (page.status === 200) {
        embedUrl = extractEmbed(page.body);
        if (embedUrl) break;
      }
    }

    // B) Try Search fallback if not found
    if (!embedUrl) {
      const searchRes = await fetchUrl(`/tim-kiem?keyword=${movie.title.replace(/ /g, '+')}`);
      const slugs = extractSlugsFromSearch(searchRes.body);
      
      for (const slug of slugs.slice(0, 3)) { // Check top 3 results
        const page = await fetchUrl(`/phim-le/${slug}`);
        if (page.status === 200) {
          embedUrl = extractEmbed(page.body);
          if (embedUrl) break;
        }
      }
    }

    if (embedUrl) {
      movie.fullMovieUrl = embedUrl;
      console.log(`✓ Stream: ${embedUrl}`);
      updatedCount++;
    } else {
      console.log(`✗ Stream not found on phim.city`);
      // Optional: keep the previous fallback if not found
    }
    
    // Slight delay to avoid hammering the server
    await new Promise(r => setTimeout(r, 400));
  }

  fs.writeFileSync(filePath, JSON.stringify(movies, null, 2));
  console.log(`\nSuccessfully updated trailers and ${updatedCount} streams in movies.json`);
}

main().catch(console.error);
