const https = require('https');
const fs = require('fs');

// Extra slug attempts for the 12 that failed
const RETRY = [
  { id: 'john-wick-4',       title: 'John Wick: Chapter 4',               slugs: ['john-wick-4', 'john-wick-chapter-4', 'john-wick-chuong-4', 'sat-thu-john-wick-4', 'john-wick'] },
  { id: 'black-panther-2',   title: 'Black Panther: Wakanda Forever',     slugs: ['bao-den-wakanda-muon-doi', 'black-panther-2', 'black-panther-wakanda', 'wakanda-forever', 'black-panther-wakanda-forever'] },
  { id: 'mi-dead-reckoning',  title: 'Mission Impossible Dead Reckoning',  slugs: ['nhiem-vu-bat-kha-thi-7', 'nhiem-vu-bat-kha-thi-phan-7', 'mission-impossible-7', 'mission-impossible-dead-reckoning', 'nhiem-vu-bat-kha-thi-su-tinh-toan-chet-chet-choc'] },
  { id: 'avatar-2',          title: 'Avatar The Way of Water',            slugs: ['avatar-dong-nuoc', 'avatar-2', 'avatar-2-dong-nuoc', 'avatar-the-way-of-water', 'con-duong-cua-nuoc'] },
  { id: 'jungle-cruise',     title: 'Jungle Cruise',                      slugs: ['jungle-cruise', 'cuoc-phieu-luu-rung-xanh', 'hanh-trinh-rung-xanh', 'phieu-luu-rung-xanh'] },
  { id: 'lost-city',         title: 'The Lost City',                      slugs: ['thanh-pho-bi-mat', 'the-lost-city', 'lost-city', 'tp-bi-mat', 'lost-city-of-d'] },
  { id: 'glass-onion',       title: 'Glass Onion',                        slugs: ['glass-onion', 'hanh-tay-kinh', 'knives-out-2', 'glass-onion-bi-an', 'dao-lam-bep-2'] },
  { id: 'ticket-paradise',   title: 'Ticket to Paradise',                 slugs: ['ve-ve-thien-duong', 'ticket-to-paradise', 'ticket-paradise', 'tam-ve-thien-duong'] },
  { id: 'eeaao',             title: 'Everything Everywhere All at Once',  slugs: ['moi-thu-moi-noi-cung-mot-luc', 'everything-everywhere-all-at-once', 'moi-noi-moi-luc', 'eeaao'] },
  { id: 'the-whale',         title: 'The Whale',                          slugs: ['con-ca-voi', 'the-whale', 'the-whale-2022', 'ca-voi'] },
  { id: 'smile-2022',        title: 'Smile',                              slugs: ['nu-cuoi-tu-than', 'smile', 'smile-2022', 'nu-cuoi-chet-choc', 'nu-cuoi-am-anh'] },
  { id: 'scream-2022',       title: 'Scream 2022',                        slugs: ['tieng-ket-la-5', 'scream-5', 'scream-2022', 'scream', 'tieng-riet-5'] },
];

function fetchPage(slug) {
  return new Promise((resolve) => {
    const req = https.request({
      hostname: 'chill.phim.city',
      path: `/phim-le/${encodeURIComponent(slug)}`,
      method: 'GET',
      headers: { 'User-Agent': 'Mozilla/5.0 Chrome/124.0.0.0', 'Referer': 'https://chill.phim.city/' }
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
  const m = body.match(/["'](https?:\/\/play\.123embed\.net\/[^"']+)["']/i);
  return m ? m[1] : null;
}

async function main() {
  const results = {};

  for (const target of RETRY) {
    process.stdout.write(`${target.title} ... `);
    let found = null;
    for (const slug of target.slugs) {
      const { status, body } = await fetchPage(slug);
      if (status === 200) {
        const embed = extractEmbed(body);
        if (embed) { found = embed; break; }
      }
      await new Promise(r => setTimeout(r, 200));
    }
    if (found) {
      results[target.id] = found;
      console.log(`✓ ${found}`);
    } else {
      console.log(`✗`);
    }
    await new Promise(r => setTimeout(r, 400));
  }

  console.log('\n--- Extra found ---');
  console.log(JSON.stringify(results, null, 2));
}

main().catch(console.error);
