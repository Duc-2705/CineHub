const fs = require('fs');
const https = require('https');

function getWikiImage(query) {
  return new Promise((resolve) => {
    // URL encode the query, replace spaces with underscores for titles
    const title = encodeURIComponent(query.replace(/ /g, '_'));
    const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${title}&prop=pageimages&format=json&pithumbsize=500`;
    
    https.get(url, { headers: { 'User-Agent': 'CineHubScript/1.0' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const pages = json.query.pages;
          const pageId = Object.keys(pages)[0];
          if (pageId !== '-1' && pages[pageId].thumbnail) {
            resolve(pages[pageId].thumbnail.source);
          } else {
            // Try search API if exact title fails
            const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&utf8=&format=json&srlimit=1`;
            https.get(searchUrl, { headers: { 'User-Agent': 'CineHubScript/1.0' } }, (res2) => {
              let sData = '';
              res2.on('data', chunk => sData += chunk);
              res2.on('end', () => {
                const sJson = JSON.parse(sData);
                if (sJson.query.search.length > 0) {
                  const newTitle = encodeURIComponent(sJson.query.search[0].title.replace(/ /g, '_'));
                  const url2 = `https://en.wikipedia.org/w/api.php?action=query&titles=${newTitle}&prop=pageimages&format=json&pithumbsize=500`;
                  https.get(url2, { headers: { 'User-Agent': 'CineHubScript/1.0' } }, (res3) => {
                    let d3 = '';
                    res3.on('data', chunk => d3 += chunk);
                    res3.on('end', () => {
                      const j3 = JSON.parse(d3);
                      const pId = Object.keys(j3.query.pages)[0];
                      if (pId !== '-1' && j3.query.pages[pId].thumbnail) {
                        resolve(j3.query.pages[pId].thumbnail.source);
                      } else resolve(null);
                    });
                  }).on('error', () => resolve(null));
                } else resolve(null);
              });
            }).on('error', () => resolve(null));
          }
        } catch (e) { resolve(null); }
      });
    }).on('error', () => resolve(null));
  });
}

// Fallback images just in case Wikipedia fails for some reason
const FALLBACKS = {
  poster: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=500&q=80',
  backdrop: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1280&q=80',
  person: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=400&q=80'
};

function isBadImage(url) {
  return !url || url.includes('bBRlrpJ') || url.includes('encrypted-tbn') || url.includes('data:image') || url.includes('Joseph_Kosinski_2013');
}

async function main() {
  const filePath = 'src/data/movies.json';
  const movies = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  let updated = 0;

  for (const movie of movies) {
    console.log(`Checking ${movie.title}...`);
    let modified = false;

    if (isBadImage(movie.posterUrl)) {
      const url = await getWikiImage(movie.title + ' film');
      movie.posterUrl = url || FALLBACKS.poster;
      modified = true;
    }
    if (isBadImage(movie.backdropUrl)) {
      const url = await getWikiImage(movie.title + ' film');
      movie.backdropUrl = url || FALLBACKS.backdrop;
      modified = true;
    }
    
    if (movie.director && isBadImage(movie.director.imageUrl)) {
      const url = await getWikiImage(movie.director.name);
      movie.director.imageUrl = url || FALLBACKS.person;
      modified = true;
    }

    for (const actor of movie.cast) {
      if (isBadImage(actor.imageUrl)) {
        const url = await getWikiImage(actor.name);
        actor.imageUrl = url || FALLBACKS.person;
        modified = true;
      }
    }

    if (modified) updated++;
    
    await new Promise(r => setTimeout(r, 200));
  }

  fs.writeFileSync(filePath, JSON.stringify(movies, null, 2));
  console.log(`\nFixed images for ${updated} movies using Wikipedia API.`);
}

main();
