const https = require('https');
const fs = require('fs');

const FAILED_MOVIES = [
  { id: 'inception',      title: 'Inception' },
  { id: 'madmax',         title: 'Mad Max Fury Road' },
  { id: 'gladiator',      title: 'Gladiator' },
  { id: 'interstellar',   title: 'Interstellar' },
  { id: 'dune',           title: 'Dune' },
  { id: 'jurassic-park',  title: 'Jurassic Park' },
  { id: 'lotr',           title: 'Lord of the Rings' },
  { id: 'indiana',        title: 'Raiders of the Lost Ark' },
  { id: 'hangover',       title: 'The Hangover' },
  { id: 'superbad',       title: 'Superbad' },
  { id: 'stepbrothers',   title: 'Step Brothers' },
  { id: 'dumbanddumber',  title: 'Dumb and Dumber' },
  { id: 'grandbudapest',  title: 'Grand Budapest Hotel' },
  { id: 'getout',         title: 'Get Out' },
  { id: 'nightmare',      title: 'Nightmare Elm Street' },
  { id: 'exorcist',       title: 'The Exorcist' },
  { id: 'shining',        title: 'The Shining' },
  { id: 'pulp-fiction',   title: 'Pulp Fiction' },
  { id: 'godfather',      title: 'The Godfather' },
  { id: 'forrest-gump',   title: 'Forrest Gump' },
  { id: 'fight-club',     title: 'Fight Club' },
];

function get(hostname, path) {
  return new Promise((resolve) => {
    const options = {
      hostname,
      path: encodeURI(path),
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'vi-VN,vi;q=0.9,en;q=0.8',
        'Referer': 'https://chill.phim.city/',
      }
    };
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve({ status: res.statusCode, body: data, headers: res.headers }));
    });
    req.on('error', e => resolve({ status: 0, body: '', headers: {} }));
    req.setTimeout(10000, () => { req.destroy(); resolve({ status: 408, body: '', headers: {} }); });
    req.end();
  });
}

function extractEmbed(body) {
  const m1 = body.match(/["'](https?:\/\/play\.123embed\.net\/[^"']+)["']/i);
  if (m1) return m1[1];
  const m2 = body.match(/<iframe[^>]+src=["']([^"']*embed[^"']*)["']/i);
  if (m2 && !m2[1].includes('.css') && !m2[1].includes('.js')) return m2[1];
  return null;
}

function extractSlugsFromSearch(body) {
  // Match /phim-le/SLUG links in the search results
  const regex = /href=["']\/phim-le\/([a-z0-9\-]+)["']/gi;
  const slugs = new Set();
  let m;
  while ((m = regex.exec(body)) !== null) slugs.add(m[1]);
  return Array.from(slugs);
}

async function main() {
  const file = './src/data/movies.json';
  const movies = JSON.parse(fs.readFileSync(file));
  const results = {};

  for (let i = 0; i < FAILED_MOVIES.length; i++) {
    const { id, title } = FAILED_MOVIES[i];
    const movie = movies.find(m => m.id === id);
    process.stdout.write(`[${i+1}/${FAILED_MOVIES.length}] ${title} ... `);

    // Step 1: Search the site
    const searchRes = await get('chill.phim.city', `/tim-kiem?keyword=${encodeURIComponent(title)}`);
    const candidates = extractSlugsFromSearch(searchRes.body);

    if (candidates.length === 0) {
      // Try alternate search endpoint
      const searchRes2 = await get('chill.phim.city', `/tim-kiem?q=${encodeURIComponent(title)}`);
      const cands2 = extractSlugsFromSearch(searchRes2.body);
      candidates.push(...cands2);
    }

    let found = false;
    for (const slug of candidates.slice(0, 3)) { // Check top 3 results max
      const pageRes = await get('chill.phim.city', `/phim-le/${slug}`);
      const embed = extractEmbed(pageRes.body);
      if (embed) {
        results[id] = embed;
        console.log(`✓ ${embed} (slug: ${slug})`);
        found = true;
        break;
      }
    }

    if (!found) {
      console.log(`✗ Not found (${candidates.length} candidates: ${candidates.slice(0,2).join(', ')})`);
    }

    await new Promise(r => setTimeout(r, 700));
  }

  // Patch movies.json
  let updated = 0;
  movies.forEach(m => {
    if (results[m.id]) {
      m.fullMovieUrl = results[m.id];
      updated++;
    }
  });
  fs.writeFileSync(file, JSON.stringify(movies, null, 2));

  console.log(`\n✅ Updated ${updated} additional movies in movies.json`);
  console.log('\nStill using YouTube demo:');
  FAILED_MOVIES.forEach(f => { if (!results[f.id]) console.log(`  - ${f.title}`); });
}

main().catch(console.error);
