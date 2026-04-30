const https = require('https');
const fs = require('fs');

// For each movie, try multiple possible slugs (English + Vietnamese patterns)
const TARGETS = [
  { id: 'top-gun-maverick',   title: 'Top Gun: Maverick',                  genre: ['Action'], year: 2022,
    slugs: ['top-gun-maverick', 'top-gun-phi-cong-sieu-dang-maverick', 'phi-cong-sieu-dang-maverick', 'top-gun-2'] },

  { id: 'john-wick-4',        title: 'John Wick: Chapter 4',               genre: ['Action'], year: 2023,
    slugs: ['john-wick-chuong-4', 'john-wick-4', 'john-wick-phan-4', 'sat-thu-john-wick-4'] },

  { id: 'black-panther-2',    title: 'Black Panther: Wakanda Forever',     genre: ['Action'], year: 2022,
    slugs: ['bao-den-wakanda-muon-doi', 'black-panther-wakanda-forever', 'black-panther-2', 'bao-den-2'] },

  { id: 'mi-dead-reckoning',  title: 'Mission: Impossible – Dead Reckoning', genre: ['Action'], year: 2023,
    slugs: ['nhiem-vu-bat-kha-thi-7', 'mission-impossible-dead-reckoning', 'nhiem-vu-bat-kha-thi-phan-7', 'mi7'] },

  { id: 'avatar-2',           title: 'Avatar: The Way of Water',           genre: ['Adventure'], year: 2022,
    slugs: ['avatar-dong-nuoc', 'avatar-2-dong-nuoc', 'avatar-2', 'avatar-the-way-of-water'] },

  { id: 'uncharted',          title: 'Uncharted',                          genre: ['Adventure'], year: 2022,
    slugs: ['uncharted', 'kho-bau-bi-an', 'uncharted-kho-bau-bi-an', 'hanh-trinh-bi-an'] },

  { id: 'jungle-cruise',      title: 'Jungle Cruise',                      genre: ['Adventure'], year: 2021,
    slugs: ['hanh-trinh-rung-xanh', 'jungle-cruise', 'cuoc-phieu-luu-rung-xanh'] },

  { id: 'lost-city',          title: 'The Lost City',                      genre: ['Adventure'], year: 2022,
    slugs: ['thanh-pho-bi-mat', 'the-lost-city', 'lost-city', 'thanh-pho-da-mat'] },

  { id: 'barbie',             title: 'Barbie',                             genre: ['Comedy'], year: 2023,
    slugs: ['barbie', 'bup-be-barbie', 'barbie-2023'] },

  { id: 'glass-onion',        title: 'Glass Onion: A Knives Out Mystery',  genre: ['Comedy'], year: 2022,
    slugs: ['glass-onion', 'hanh-tay-kinh', 'glass-onion-bi-an-knives-out', 'knives-out-2'] },

  { id: 'ticket-paradise',    title: 'Ticket to Paradise',                 genre: ['Comedy'], year: 2022,
    slugs: ['ve-ve-thien-duong', 'ticket-to-paradise', 'ticket-paradise'] },

  { id: 'mario-movie',        title: 'The Super Mario Bros. Movie',        genre: ['Comedy'], year: 2023,
    slugs: ['anh-em-super-mario', 'super-mario-bros-movie', 'super-mario-2023', 'the-super-mario-bros-movie'] },

  { id: 'oppenheimer',        title: 'Oppenheimer',                        genre: ['Drama'], year: 2023,
    slugs: ['oppenheimer', 'oppenheimer-2023'] },

  { id: 'eeaao',              title: 'Everything Everywhere All at Once',  genre: ['Drama'], year: 2022,
    slugs: ['moi-thu-moi-noi-cung-mot-luc', 'everything-everywhere-all-at-once', 'moi-noi-moi-luc'] },

  { id: 'the-whale',          title: 'The Whale',                          genre: ['Drama'], year: 2022,
    slugs: ['con-ca-voi', 'the-whale', 'the-whale-2022'] },

  { id: 'elvis',              title: 'Elvis',                              genre: ['Drama'], year: 2022,
    slugs: ['elvis', 'elvis-2022', 'huyen-thoai-elvis'] },

  { id: 'smile-2022',         title: 'Smile',                              genre: ['Horror'], year: 2022,
    slugs: ['nu-cuoi-tu-than', 'smile', 'smile-2022', 'nu-cuoi-chet-choc'] },

  { id: 'm3gan',              title: 'M3GAN',                              genre: ['Horror'], year: 2023,
    slugs: ['m3gan', 'm3gan-2023', 'robot-sat-nhan'] },

  { id: 'black-phone',        title: 'The Black Phone',                    genre: ['Horror'], year: 2022,
    slugs: ['chiec-dien-thoai-den', 'the-black-phone', 'black-phone', 'dien-thoai-den'] },

  { id: 'scream-2022',        title: 'Scream',                             genre: ['Horror'], year: 2022,
    slugs: ['tieng-ket-la-5', 'scream-5', 'scream-2022', 'scream'] },
];

function fetchPage(slug) {
  return new Promise((resolve) => {
    const path = `/phim-le/${encodeURIComponent(slug)}`;
    const req = https.request({
      hostname: 'chill.phim.city',
      path,
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
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
  const foundMovies = [];
  const stillMissing = [];

  for (let i = 0; i < TARGETS.length; i++) {
    const target = TARGETS[i];
    process.stdout.write(`[${i+1}/${TARGETS.length}] ${target.title} ... `);
    
    let embedUrl = null;
    let successSlug = null;

    for (const slug of target.slugs) {
      const { status, body } = await fetchPage(slug);
      if (status === 200) {
        const embed = extractEmbed(body);
        if (embed) {
          embedUrl = embed;
          successSlug = slug;
          break;
        }
      }
      await new Promise(r => setTimeout(r, 200));
    }

    if (embedUrl) {
      console.log(`✓ ${embedUrl}`);
      foundMovies.push({ ...target, fullMovieUrl: embedUrl, successSlug });
    } else {
      console.log(`✗ Not found`);
      stillMissing.push(target);
    }
    
    await new Promise(r => setTimeout(r, 400));
  }

  console.log(`\n✅ Found ${foundMovies.length}/${TARGETS.length} movies with embed URLs`);
  console.log('\nResults JSON (for movies.json):');
  console.log(JSON.stringify(foundMovies.map(m => ({
    id: m.id, title: m.title, slug: m.successSlug, fullMovieUrl: m.fullMovieUrl
  })), null, 2));

  if (stillMissing.length > 0) {
    console.log('\n❌ Still missing:');
    stillMissing.forEach(m => console.log(`  - ${m.title}`));
  }
}

main().catch(console.error);
