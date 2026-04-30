const https = require('https');
const fs = require('fs');

const TARGETS = [
  // ACTION (4)
  { id: 'top-gun-maverick',  title: 'Top Gun: Maverick',           genre: ['Action'],           year: 2022, rating: 8.3, duration: '2h 11min', slugs: ['top-gun-maverick','phi-cong-sieu-dang-maverick','top-gun-2'] },
  { id: 'black-panther-2',   title: 'Black Panther: Wakanda Forever', genre: ['Action'],        year: 2022, rating: 6.7, duration: '2h 41min', slugs: ['bao-den-wakanda-muon-doi','black-panther-wakanda-forever','black-panther-2'] },
  { id: 'john-wick-4',       title: 'John Wick: Chapter 4',        genre: ['Action'],           year: 2023, rating: 7.7, duration: '2h 49min', slugs: ['john-wick-4','john-wick-chuong-4','sat-thu-john-wick-4','john-wick-chapter-4'] },
  { id: 'mi-dead-reckoning', title: 'Mission: Impossible Dead Reckoning', genre: ['Action'],   year: 2023, rating: 7.7, duration: '2h 43min', slugs: ['nhiem-vu-bat-kha-thi-7','mission-impossible-dead-reckoning','nhiem-vu-bat-kha-thi-phan-7'] },

  // ADVENTURE (4)
  { id: 'avatar-2',          title: 'Avatar: The Way of Water',    genre: ['Adventure'],        year: 2022, rating: 7.6, duration: '3h 12min', slugs: ['avatar-dong-nuoc','avatar-2','avatar-the-way-of-water','con-duong-cua-nuoc'] },
  { id: 'uncharted',         title: 'Uncharted',                   genre: ['Adventure'],        year: 2022, rating: 6.4, duration: '1h 56min', slugs: ['uncharted','kho-bau-bi-an','uncharted-kho-bau-bi-an'] },
  { id: 'jungle-cruise',     title: 'Jungle Cruise',               genre: ['Adventure'],        year: 2021, rating: 6.6, duration: '2h 7min',  slugs: ['jungle-cruise','hanh-trinh-rung-xanh','cuoc-phieu-luu-rung-xanh'] },
  { id: 'lost-city',         title: 'The Lost City',               genre: ['Adventure','Comedy'], year: 2022, rating: 5.9, duration: '1h 52min', slugs: ['thanh-pho-bi-mat','the-lost-city','lost-city'] },

  // COMEDY (4)
  { id: 'barbie',            title: 'Barbie',                      genre: ['Comedy'],           year: 2023, rating: 6.9, duration: '1h 54min', slugs: ['barbie','bup-be-barbie','barbie-2023'] },
  { id: 'glass-onion',       title: 'Glass Onion: A Knives Out Mystery', genre: ['Comedy'],    year: 2022, rating: 7.1, duration: '2h 19min', slugs: ['glass-onion','hanh-tay-kinh','knives-out-2','glass-onion-bi-an'] },
  { id: 'ticket-paradise',   title: 'Ticket to Paradise',          genre: ['Comedy'],           year: 2022, rating: 6.3, duration: '1h 44min', slugs: ['ve-ve-thien-duong','ticket-to-paradise','ticket-paradise'] },
  { id: 'mario-movie',       title: 'The Super Mario Bros. Movie', genre: ['Comedy'],           year: 2023, rating: 7.1, duration: '1h 32min', slugs: ['anh-em-super-mario','super-mario-bros-movie','super-mario-2023','the-super-mario-bros-movie'] },

  // DRAMA (4)
  { id: 'oppenheimer',       title: 'Oppenheimer',                 genre: ['Drama'],            year: 2023, rating: 8.3, duration: '3h 0min',  slugs: ['oppenheimer','oppenheimer-2023'] },
  { id: 'eeaao',             title: 'Everything Everywhere All at Once', genre: ['Drama'],     year: 2022, rating: 7.8, duration: '2h 19min', slugs: ['moi-thu-moi-noi-cung-mot-luc','everything-everywhere-all-at-once','moi-noi-moi-luc'] },
  { id: 'the-whale',         title: 'The Whale',                   genre: ['Drama'],            year: 2022, rating: 7.6, duration: '1h 57min', slugs: ['con-ca-voi','the-whale','the-whale-2022'] },
  { id: 'elvis',             title: 'Elvis',                       genre: ['Drama'],            year: 2022, rating: 7.3, duration: '2h 39min', slugs: ['elvis','elvis-2022','huyen-thoai-elvis'] },

  // HORROR (4)
  { id: 'smile-2022',        title: 'Smile',                       genre: ['Horror'],           year: 2022, rating: 6.6, duration: '1h 55min', slugs: ['nu-cuoi-tu-than','smile','smile-2022','nu-cuoi-chet-choc'] },
  { id: 'm3gan',             title: 'M3GAN',                       genre: ['Horror'],           year: 2023, rating: 6.4, duration: '1h 42min', slugs: ['m3gan','m3gan-2023','robot-sat-nhan'] },
  { id: 'black-phone',       title: 'The Black Phone',             genre: ['Horror'],           year: 2022, rating: 7.4, duration: '1h 42min', slugs: ['chiec-dien-thoai-den','the-black-phone','black-phone','dien-thoai-den'] },
  { id: 'scream-6',          title: 'Scream VI',                   genre: ['Horror'],           year: 2023, rating: 6.5, duration: '2h 2min',  slugs: ['scream-6','scream-vi','tieng-ket-la-6','tieng-riet-6'] },
];

function fetchPage(slug) {
  return new Promise((resolve) => {
    const req = https.request({
      hostname: 'chill.phim.city',
      path: `/phim-le/${encodeURIComponent(slug)}`,
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml;q=0.9,*/*;q=0.8',
        'Referer': 'https://chill.phim.city/',
      }
    }, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve({ status: res.statusCode, body: data }));
    });
    req.on('error', () => resolve({ status: 0, body: '' }));
    req.setTimeout(10000, () => { req.destroy(); resolve({ status: 408, body: '' }); });
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

function extractPoster(body) {
  const m = body.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i)
    || body.match(/<img[^>]+class=["'][^"']*poster[^"']*["'][^>]+src=["']([^"']+)["']/i);
  return m ? m[1] : null;
}

async function main() {
  const results = [];

  for (let i = 0; i < TARGETS.length; i++) {
    const t = TARGETS[i];
    process.stdout.write(`[${i+1}/${TARGETS.length}] ${t.title} ... `);
    let embedUrl = null;
    let posterFromSite = null;

    for (const slug of t.slugs) {
      const { status, body } = await fetchPage(slug);
      if (status === 200) {
        const embed = extractEmbed(body);
        if (embed) {
          embedUrl = embed;
          posterFromSite = extractPoster(body);
          break;
        }
      }
      await new Promise(r => setTimeout(r, 250));
    }

    if (embedUrl) {
      console.log(`✓ ${embedUrl}`);
    } else {
      console.log('✗ Not found – using YouTube fallback');
    }

    results.push({ id: t.id, fullMovieUrl: embedUrl, posterFromSite });
    await new Promise(r => setTimeout(r, 500));
  }

  console.log('\n--- Slug Results ---');
  console.log(JSON.stringify(results, null, 2));
}

main().catch(console.error);
