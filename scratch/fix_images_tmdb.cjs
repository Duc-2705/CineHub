const fs = require('fs');
const https = require('https');

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36', 'Accept-Language': 'en-US,en;q=0.9' } }, (res) => {
      // Follow redirects
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetchUrl(res.headers.location.startsWith('http') ? res.headers.location : 'https://www.themoviedb.org' + res.headers.location).then(resolve).catch(reject);
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function getMovieImages(title, year) {
  try {
    const searchUrl = `https://www.themoviedb.org/search?query=${encodeURIComponent(title)}`;
    const searchHtml = await fetchUrl(searchUrl);
    
    // Find first movie link
    const match = searchHtml.match(/href="\/movie\/(\d+)[^"]*"/);
    if (!match) return null;
    const movieId = match[1];
    
    const movieHtml = await fetchUrl('https://www.themoviedb.org/movie/' + movieId);
    
    // Poster
    const posterMatch = movieHtml.match(/<img class="poster"[^>]*src="(https:\/\/media\.themoviedb\.org\/t\/p\/w[^"]+)"/);
    const posterUrl = posterMatch ? posterMatch[1] : null;
    
    // Backdrop
    const backdropMatch = movieHtml.match(/(https:\/\/media\.themoviedb\.org\/t\/p\/w1920_and_h800_multi_faces[^"]+)/) || 
                          movieHtml.match(/(https:\/\/media\.themoviedb\.org\/t\/p\/original[^"]+)/) ||
                          movieHtml.match(/data-src="(https:\/\/media\.themoviedb\.org\/t\/p\/[^"]+)"/);
    const backdropUrl = backdropMatch ? backdropMatch[1] : null;

    // Cast mapping
    const cast = {};
    const castRegex = /<li class="card">.*?<a href="\/person\/\d+.*?<img loading="lazy" class="profile" src="(https:\/\/media\.themoviedb\.org\/t\/p\/w138_and_h175_face[^"]+)".*?alt="([^"]+)"/gs;
    let cMatch;
    while ((cMatch = castRegex.exec(movieHtml)) !== null) {
      cast[cMatch[2].trim()] = cMatch[1];
    }
    
    // We can also just extract all person images from the page
    const peopleRegex = /<img loading="lazy" class="profile" src="(https:\/\/media\.themoviedb\.org\/t\/p\/w138_and_h175_face[^"]+)".*?alt="([^"]+)"/g;
    const peopleImages = {};
    let pMatch;
    while ((pMatch = peopleRegex.exec(movieHtml)) !== null) {
      peopleImages[pMatch[2].trim()] = pMatch[1];
    }

    return { posterUrl, backdropUrl, peopleImages };
  } catch (e) {
    console.error(`Error fetching for ${title}:`, e.message);
    return null;
  }
}

async function main() {
  const filePath = 'src/data/movies.json';
  const movies = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  let updated = 0;

  for (const movie of movies) {
    console.log(`Fetching images for ${movie.title}...`);
    const data = await getMovieImages(movie.title, movie.year);
    if (!data) {
      console.log(`  Failed to get data from TMDB.`);
      continue;
    }
    
    let movieUpdated = false;

    if (data.posterUrl && (!movie.posterUrl || movie.posterUrl.includes('bBRlrpJ') || movie.posterUrl.includes('encrypted-tbn0') || movie.posterUrl.includes('data:image'))) {
      movie.posterUrl = data.posterUrl;
      movieUpdated = true;
    }
    if (data.backdropUrl && (!movie.backdropUrl || movie.backdropUrl.includes('bBRlrpJ') || movie.backdropUrl.includes('encrypted-tbn0') || movie.backdropUrl.includes('data:image'))) {
      movie.backdropUrl = data.backdropUrl;
      movieUpdated = true;
    }
    
    if (movie.director && movie.director.name) {
      const img = data.peopleImages[movie.director.name];
      if (img && (!movie.director.imageUrl || movie.director.imageUrl.includes('Joseph_Kosinski') || movie.director.imageUrl.includes('encrypted-tbn0') || movie.director.imageUrl.includes('data:image'))) {
        movie.director.imageUrl = img;
        movieUpdated = true;
      }
    }

    for (const actor of movie.cast) {
      const img = data.peopleImages[actor.name];
      if (img && (!actor.imageUrl || actor.imageUrl.includes('bBRlrpJ') || actor.imageUrl.includes('encrypted-tbn0') || actor.imageUrl.includes('data:image'))) {
        actor.imageUrl = img;
        movieUpdated = true;
      }
    }

    if (movieUpdated) {
      updated++;
      console.log(`  Updated!`);
    } else {
      console.log(`  No updates needed or available.`);
    }
    
    await new Promise(r => setTimeout(r, 1000));
  }

  fs.writeFileSync(filePath, JSON.stringify(movies, null, 2));
  console.log(`\nFinished updating images for ${updated} movies.`);
}

main();
