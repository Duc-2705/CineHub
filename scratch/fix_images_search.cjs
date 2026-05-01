const fs = require('fs');
const https = require('https');

function searchImage(query) {
  return new Promise((resolve) => {
    const url = `https://images.search.yahoo.com/search/images?p=${encodeURIComponent(query)}`;
    https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'text/html'
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        // Yahoo images stores the original url in a data attribute or href
        // Let's find the first imgurl=&quot;...&quot; or similar
        const match = data.match(/imgurl=(https?:\/\/[^&]+)/);
        if (match) {
          resolve(decodeURIComponent(match[1]));
        } else {
          resolve(null);
        }
      });
    }).on('error', () => resolve(null));
  });
}

async function main() {
  const filePath = 'src/data/movies.json';
  const movies = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  let updated = 0;

  for (const movie of movies) {
    console.log(`Fixing images for: ${movie.title}`);
    let modified = false;

    // Check poster
    if (movie.posterUrl.includes('bBRlrpJ') || movie.posterUrl.includes('encrypted-tbn') || movie.posterUrl.includes('data:image')) {
      const url = await searchImage(`${movie.title} official movie poster`);
      if (url) { movie.posterUrl = url; modified = true; }
    }
    
    // Check backdrop
    if (movie.backdropUrl.includes('bBRlrpJ') || movie.backdropUrl.includes('beam-images') || movie.backdropUrl.includes('thumbnails.cbsig') || movie.backdropUrl.includes('data:image')) {
      const url = await searchImage(`${movie.title} movie backdrop wallpaper high quality`);
      if (url) { movie.backdropUrl = url; modified = true; }
    }

    // Check director
    if (movie.director && movie.director.name && (movie.director.imageUrl.includes('Joseph_Kosinski') || movie.director.imageUrl.includes('encrypted-tbn') || movie.director.imageUrl.includes('data:image') || movie.director.imageUrl.includes('bBRlrpJ'))) {
      const url = await searchImage(`${movie.director.name} director face portrait`);
      if (url) { movie.director.imageUrl = url; modified = true; }
    }

    // Check cast
    for (const actor of movie.cast) {
      if (actor.imageUrl.includes('bBRlrpJ') || actor.imageUrl.includes('encrypted-tbn') || actor.imageUrl.includes('data:image')) {
        const url = await searchImage(`${actor.name} actor face portrait`);
        if (url) { actor.imageUrl = url; modified = true; }
      }
    }

    if (modified) {
      updated++;
      console.log(`  -> Updated`);
    } else {
      console.log(`  -> No bad images found or search failed`);
    }
    
    // Avoid rate limiting
    await new Promise(r => setTimeout(r, 1000));
  }

  fs.writeFileSync(filePath, JSON.stringify(movies, null, 2));
  console.log(`\nFinished updating images for ${updated} movies using Yahoo Image Search.`);
}

main();
