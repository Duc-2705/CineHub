const fs = require('fs');
const https = require('https');

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function getMovieInfo(title) {
  try {
    const searchHtml = await fetchUrl('https://www.themoviedb.org/search?query=' + encodeURIComponent(title));
    const match = searchHtml.match(/href="\/movie\/(\d+)[^"]*"/);
    if (!match) return null;
    const movieId = match[1];
    const movieHtml = await fetchUrl('https://www.themoviedb.org/movie/' + movieId);
    
    const posterMatch = movieHtml.match(/<img class="poster"[^>]*src="(https:\/\/media\.themoviedb\.org\/t\/p\/w[^"]+)"/);
    const posterUrl = posterMatch ? posterMatch[1] : null;
    
    // The backdrop might be in a style tag or a data-src or a normal image. Let's look for any large tmdb image
    const backdropMatch = movieHtml.match(/(https:\/\/media\.themoviedb\.org\/t\/p\/w1920_and_h800_multi_faces[^"]+)/) || 
                          movieHtml.match(/(https:\/\/media\.themoviedb\.org\/t\/p\/original[^"]+)/) ||
                          movieHtml.match(/data-src="(https:\/\/media\.themoviedb\.org\/t\/p\/[^"]+)"/);
    const backdropUrl = backdropMatch ? backdropMatch[1] : null;

    const castRegex = /<img loading="lazy" class="profile" src="(https:\/\/media\.themoviedb\.org\/t\/p\/w138_and_h175_face[^"]+)"[^>]*alt="([^"]+)"/g;
    const cast = [];
    let cMatch;
    while ((cMatch = castRegex.exec(movieHtml)) !== null && cast.length < 4) {
      cast.push({ name: cMatch[2], imageUrl: cMatch[1] });
    }

    // Try to get director
    const dirMatch = movieHtml.match(/<li class="profile">.*?<a href="\/person\/\d+.*?">(.*?)<\/a>.*?<p class="character">Director<\/p>/s);
    const dirName = dirMatch ? dirMatch[1] : null;

    return { posterUrl, backdropUrl, cast, dirName };
  } catch (e) {
    console.error(e);
    return null;
  }
}

async function main() {
  const info = await getMovieInfo('The Dark Knight');
  console.log(info);
}

main();
