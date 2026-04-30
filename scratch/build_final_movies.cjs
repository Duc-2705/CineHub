const fs = require('fs');

const movieData = [
  // Action
  { id: 'top-gun-maverick', title: 'Top Gun: Maverick', year: 2022, genres: ['Action', 'Drama'], full: 'https://play.123embed.net/mv/361743',
    desc: 'After thirty years, Maverick is still pushing the envelope as a top naval aviator, but must confront ghosts of his past.',
    poster: 'https://image.tmdb.org/t/p/w500/62HCnUTziyWcpDaBO2i1DX17ljH.jpg', bg: 'https://image.tmdb.org/t/p/w1280/AaV1YIdWKnjAIAOe8OEQi0x111v.jpg', dir: 'Joseph Kosinski',
    cast: ['Tom Cruise|https://image.tmdb.org/t/p/w200/gThaIXgpCm3EpJCnNiAWk4N2Zt1.jpg', 'Miles Teller|https://image.tmdb.org/t/p/w200/cgk0EonwY43h7zZzP9PjH7b4nI3.jpg'] },
  
  { id: 'john-wick-4', title: 'John Wick: Chapter 4', year: 2023, genres: ['Action', 'Thriller'], full: 'https://www.youtube.com/embed/qEVUtrk8_B4',
    desc: 'John Wick uncovers a path to defeating The High Table, but before he can earn his freedom, Wick must face off against a new enemy.',
    poster: 'https://image.tmdb.org/t/p/w500/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg', bg: 'https://image.tmdb.org/t/p/w1280/7I6VUdPj6tQECNHdviJkUHD2u89.jpg', dir: 'Chad Stahelski',
    cast: ['Keanu Reeves|https://image.tmdb.org/t/p/w200/4D0PpNIIQBDZIlLSZCS37877Beb.jpg', 'Donnie Yen|https://image.tmdb.org/t/p/w200/hTlhrrZMj8hZVvD17j4KyAFWSHc.jpg'] },

  { id: 'mi-dead-reckoning', title: 'Mission: Impossible - Dead Reckoning Part One', year: 2023, genres: ['Action', 'Adventure'], full: 'https://www.youtube.com/embed/avz06PDqDbM',
    desc: 'Ethan Hunt and his IMF team embark on their most dangerous mission yet: To track down a terrifying new weapon.',
    poster: 'https://image.tmdb.org/t/p/w500/NNxYkU70HPurnNCSiCjYAmacwm.jpg', bg: 'https://image.tmdb.org/t/p/w1280/c6Splshb8lb2Q9OvUfhpqXl7uP0.jpg', dir: 'Christopher McQuarrie',
    cast: ['Tom Cruise|https://image.tmdb.org/t/p/w200/gThaIXgpCm3EpJCnNiAWk4N2Zt1.jpg', 'Hayley Atwell|https://image.tmdb.org/t/p/w200/l2qU8N8E2B2C9s42XhL5N2OetJ0.jpg'] },

  { id: 'the-batman', title: 'The Batman', year: 2022, genres: ['Action', 'Crime'], full: 'https://www.youtube.com/embed/mqqft2x_Aa4',
    desc: 'When a sadistic serial killer begins murdering key political figures in Gotham, Batman is forced to investigate.',
    poster: 'https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg', bg: 'https://image.tmdb.org/t/p/w1280/b0PlSFdSmBgZAqfwSECJQ22kH.jpg', dir: 'Matt Reeves',
    cast: ['Robert Pattinson|https://image.tmdb.org/t/p/w200/rXf1Sj0bVfB2M9b1Kz2tGg2b4g.jpg', 'Zoë Kravitz|https://image.tmdb.org/t/p/w200/l2qU8N8E2B2C9s42XhL5N2OetJ0.jpg'] },

  // Adventure
  { id: 'avatar-2', title: 'Avatar: The Way of Water', year: 2022, genres: ['Adventure', 'Sci-Fi'], full: 'https://www.youtube.com/embed/d9MyW72ELq0',
    desc: 'Jake Sully lives with his newfound family formed on the extrasolar moon Pandora.',
    poster: 'https://image.tmdb.org/t/p/w500/t6HIqrHeCP3uJ4Acdz411U4mU1n.jpg', bg: 'https://image.tmdb.org/t/p/w1280/s16H6tpK2utvwDtzZ8Qy4qm5Emw.jpg', dir: 'James Cameron',
    cast: ['Sam Worthington|https://image.tmdb.org/t/p/w200/mflBcox36s96NtlZZ4elZG4aeC.jpg', 'Zoe Saldaña|https://image.tmdb.org/t/p/w200/vQqNCZ0Lofh1Z0A1U3k0XoJ2pW.jpg'] },
  
  { id: 'uncharted', title: 'Uncharted', year: 2022, genres: ['Adventure', 'Action'], full: 'https://www.youtube.com/embed/eHp3MbsCbMg',
    desc: 'Street-smart Nathan Drake is recruited by seasoned treasure hunter Victor "Sully" Sullivan to recover a fortune.',
    poster: 'https://image.tmdb.org/t/p/w500/rJHC1RUORuUhtfNb4Npclx0ls3y.jpg', bg: 'https://image.tmdb.org/t/p/w1280/cTT0xVp0T0xVp0T0xVp0T0xVp0.jpg', dir: 'Ruben Fleischer',
    cast: ['Tom Holland|https://image.tmdb.org/t/p/w200/bBRlrpJm9XkArtcVcgqmyZP7oG.jpg', 'Mark Wahlberg|https://image.tmdb.org/t/p/w200/bBRlrpJm9XkArtcVcgqmyZP7oG.jpg'] },
  
  { id: 'jungle-cruise', title: 'Jungle Cruise', year: 2021, genres: ['Adventure', 'Comedy'], full: 'https://www.youtube.com/embed/f_HvoipFcA8',
    desc: 'Dr. Lily Houghton enlists the aid of wisecracking skipper Frank Wolff to take her down the Amazon.',
    poster: 'https://image.tmdb.org/t/p/w500/9dKCd55IuTT5QRs989m9QjB3mU2.jpg', bg: 'https://image.tmdb.org/t/p/w1280/bBRlrpJm9XkArtcVcgqmyZP7oG.jpg', dir: 'Jaume Collet-Serra',
    cast: ['Dwayne Johnson|https://image.tmdb.org/t/p/w200/bBRlrpJm9XkArtcVcgqmyZP7oG.jpg', 'Emily Blunt|https://image.tmdb.org/t/p/w200/bBRlrpJm9XkArtcVcgqmyZP7oG.jpg'] },

  { id: 'dune-2', title: 'Dune: Part Two', year: 2024, genres: ['Adventure', 'Sci-Fi'], full: 'https://www.youtube.com/embed/Way9Dexny3w',
    desc: 'Paul Atreides unites with Chani and the Fremen while on a warpath of revenge against the conspirators who destroyed his family.',
    poster: 'https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2TZjjmp4I.jpg', bg: 'https://image.tmdb.org/t/p/w1280/bBRlrpJm9XkArtcVcgqmyZP7oG.jpg', dir: 'Denis Villeneuve',
    cast: ['Timothée Chalamet|https://image.tmdb.org/t/p/w200/bBRlrpJm9XkArtcVcgqmyZP7oG.jpg', 'Zendaya|https://image.tmdb.org/t/p/w200/bBRlrpJm9XkArtcVcgqmyZP7oG.jpg'] },

  // Comedy
  { id: 'barbie', title: 'Barbie', year: 2023, genres: ['Comedy', 'Fantasy'], full: 'https://play.123embed.net/mv/346698',
    desc: 'Barbie and Ken are having the time of their lives in the colorful and seemingly perfect world of Barbie Land.',
    poster: 'https://image.tmdb.org/t/p/w500/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg', bg: 'https://image.tmdb.org/t/p/w1280/ctMserH8g2SeOAnCw5gFjdQ8lzF.jpg', dir: 'Greta Gerwig',
    cast: ['Margot Robbie|https://image.tmdb.org/t/p/w200/bBRlrpJm9XkArtcVcgqmyZP7oG.jpg', 'Ryan Gosling|https://image.tmdb.org/t/p/w200/bBRlrpJm9XkArtcVcgqmyZP7oG.jpg'] },

  { id: 'glass-onion', title: 'Glass Onion', year: 2022, genres: ['Comedy', 'Crime'], full: 'https://www.youtube.com/embed/gj5ibYSz8C0',
    desc: 'Tech billionaire Miles Bron invites his friends for a getaway on his private Greek island. When someone turns up dead, Detective Benoit Blanc is put on the case.',
    poster: 'https://image.tmdb.org/t/p/w500/vDGr1YdrlfbU9wxTOdpf3zChmv9.jpg', bg: 'https://image.tmdb.org/t/p/w1280/bBRlrpJm9XkArtcVcgqmyZP7oG.jpg', dir: 'Rian Johnson',
    cast: ['Daniel Craig|https://image.tmdb.org/t/p/w200/bBRlrpJm9XkArtcVcgqmyZP7oG.jpg', 'Edward Norton|https://image.tmdb.org/t/p/w200/bBRlrpJm9XkArtcVcgqmyZP7oG.jpg'] },

  { id: 'mario-movie', title: 'The Super Mario Bros. Movie', year: 2023, genres: ['Comedy', 'Animation'], full: 'https://play.123embed.net/mv/502356',
    desc: 'While working underground to fix a water main, Brooklyn plumbers Mario and brother Luigi are transported down a mysterious pipe.',
    poster: 'https://image.tmdb.org/t/p/w500/qNBAXBIQlnOThD1pA1yicpOZeCj.jpg', bg: 'https://image.tmdb.org/t/p/w1280/9n2tFBlOqTebFj7M9X1eQjT1Y9r.jpg', dir: 'Aaron Horvath',
    cast: ['Chris Pratt|https://image.tmdb.org/t/p/w200/bBRlrpJm9XkArtcVcgqmyZP7oG.jpg', 'Anya Taylor-Joy|https://image.tmdb.org/t/p/w200/bBRlrpJm9XkArtcVcgqmyZP7oG.jpg'] },

  { id: 'ticket-to-paradise', title: 'Ticket to Paradise', year: 2022, genres: ['Comedy', 'Romance'], full: 'https://www.youtube.com/embed/hkP4tVTvNiY',
    desc: 'A divorced couple teams up and travels to Bali to stop their daughter from making the same mistake they think they made 25 years ago.',
    poster: 'https://image.tmdb.org/t/p/w500/1tzFSGE1yH7QzIIt4pS3r2a1hYy.jpg', bg: 'https://image.tmdb.org/t/p/w1280/bBRlrpJm9XkArtcVcgqmyZP7oG.jpg', dir: 'Ol Parker',
    cast: ['George Clooney|https://image.tmdb.org/t/p/w200/bBRlrpJm9XkArtcVcgqmyZP7oG.jpg', 'Julia Roberts|https://image.tmdb.org/t/p/w200/bBRlrpJm9XkArtcVcgqmyZP7oG.jpg'] },

  // Drama
  { id: 'oppenheimer', title: 'Oppenheimer', year: 2023, genres: ['Drama', 'History'], full: 'https://play.123embed.net/mv/872585',
    desc: 'The story of J. Robert Oppenheimer\'s role in the development of the atomic bomb during World War II.',
    poster: 'https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg', bg: 'https://image.tmdb.org/t/p/w1280/fm6KqXpk3M2HVveHwCrBSSBaO0V.jpg', dir: 'Christopher Nolan',
    cast: ['Cillian Murphy|https://image.tmdb.org/t/p/w200/bBRlrpJm9XkArtcVcgqmyZP7oG.jpg', 'Emily Blunt|https://image.tmdb.org/t/p/w200/bBRlrpJm9XkArtcVcgqmyZP7oG.jpg'] },

  { id: 'eeaao', title: 'Everything Everywhere All at Once', year: 2022, genres: ['Drama', 'Action'], full: 'https://www.youtube.com/embed/wxN1T1uxQ2g',
    desc: 'An aging Chinese immigrant is swept up in an insane adventure, where she alone can save the world by exploring other universes connecting with the lives she could have led.',
    poster: 'https://image.tmdb.org/t/p/w500/w3LxiVYdWWRvEVdn5RYq6jIqkb1.jpg', bg: 'https://image.tmdb.org/t/p/w1280/bBRlrpJm9XkArtcVcgqmyZP7oG.jpg', dir: 'Daniel Kwan',
    cast: ['Michelle Yeoh|https://image.tmdb.org/t/p/w200/bBRlrpJm9XkArtcVcgqmyZP7oG.jpg', 'Ke Huy Quan|https://image.tmdb.org/t/p/w200/bBRlrpJm9XkArtcVcgqmyZP7oG.jpg'] },

  { id: 'the-whale', title: 'The Whale', year: 2022, genres: ['Drama'], full: 'https://www.youtube.com/embed/nWiQodhMvz4',
    desc: 'A reclusive, morbidly obese English teacher attempts to reconnect with his estranged teenage daughter.',
    poster: 'https://image.tmdb.org/t/p/w500/jQ0gylJMxWSL490sy0RrPj1Lj7e.jpg', bg: 'https://image.tmdb.org/t/p/w1280/bBRlrpJm9XkArtcVcgqmyZP7oG.jpg', dir: 'Darren Aronofsky',
    cast: ['Brendan Fraser|https://image.tmdb.org/t/p/w200/bBRlrpJm9XkArtcVcgqmyZP7oG.jpg', 'Sadie Sink|https://image.tmdb.org/t/p/w200/bBRlrpJm9XkArtcVcgqmyZP7oG.jpg'] },

  { id: 'elvis', title: 'Elvis', year: 2022, genres: ['Drama', 'Music'], full: 'https://play.123embed.net/mv/614934',
    desc: 'The life of American music icon Elvis Presley, from his childhood to becoming a rock and movie star in the 1950s while maintaining a complex relationship with his manager.',
    poster: 'https://image.tmdb.org/t/p/w500/qBOKWqAFbveZ4ryjJJwbie6tXkQ.jpg', bg: 'https://image.tmdb.org/t/p/w1280/bBRlrpJm9XkArtcVcgqmyZP7oG.jpg', dir: 'Baz Luhrmann',
    cast: ['Austin Butler|https://image.tmdb.org/t/p/w200/bBRlrpJm9XkArtcVcgqmyZP7oG.jpg', 'Tom Hanks|https://image.tmdb.org/t/p/w200/bBRlrpJm9XkArtcVcgqmyZP7oG.jpg'] },

  // Horror
  { id: 'm3gan', title: 'M3GAN', year: 2023, genres: ['Horror', 'Sci-Fi'], full: 'https://play.123embed.net/mv/536554',
    desc: 'A robotics engineer at a toy company builds a life-like doll that begins to take on a life of its own.',
    poster: 'https://image.tmdb.org/t/p/w500/d9nBoowhjiiYc4FBNtQkCR7uB0B.jpg', bg: 'https://image.tmdb.org/t/p/w1280/bBRlrpJm9XkArtcVcgqmyZP7oG.jpg', dir: 'Gerard Johnstone',
    cast: ['Allison Williams|https://image.tmdb.org/t/p/w200/bBRlrpJm9XkArtcVcgqmyZP7oG.jpg', 'Violet McGraw|https://image.tmdb.org/t/p/w200/bBRlrpJm9XkArtcVcgqmyZP7oG.jpg'] },

  { id: 'black-phone', title: 'The Black Phone', year: 2022, genres: ['Horror', 'Thriller'], full: 'https://play.123embed.net/mv/756999',
    desc: 'After being abducted by a child killer and locked in a soundproof basement, a 13-year-old boy starts receiving calls on a disconnected phone from the killer\'s previous victims.',
    poster: 'https://image.tmdb.org/t/p/w500/lr11mCT85T1Jan5RXGQSn2QAQ0G.jpg', bg: 'https://image.tmdb.org/t/p/w1280/bBRlrpJm9XkArtcVcgqmyZP7oG.jpg', dir: 'Scott Derrickson',
    cast: ['Ethan Hawke|https://image.tmdb.org/t/p/w200/bBRlrpJm9XkArtcVcgqmyZP7oG.jpg', 'Mason Thames|https://image.tmdb.org/t/p/w200/bBRlrpJm9XkArtcVcgqmyZP7oG.jpg'] },

  { id: 'smile', title: 'Smile', year: 2022, genres: ['Horror', 'Mystery'], full: 'https://www.youtube.com/embed/BcDK7lkzzsU',
    desc: 'After witnessing a bizarre, traumatic incident involving a patient, Dr. Rose Cotter starts experiencing frightening occurrences that she can\'t explain.',
    poster: 'https://image.tmdb.org/t/p/w500/aPqcQwu4VGEewPhagWNncDbJ9Xp.jpg', bg: 'https://image.tmdb.org/t/p/w1280/bBRlrpJm9XkArtcVcgqmyZP7oG.jpg', dir: 'Parker Finn',
    cast: ['Sosie Bacon|https://image.tmdb.org/t/p/w200/bBRlrpJm9XkArtcVcgqmyZP7oG.jpg', 'Jessie T. Usher|https://image.tmdb.org/t/p/w200/bBRlrpJm9XkArtcVcgqmyZP7oG.jpg'] },

  { id: 'scream-6', title: 'Scream VI', year: 2023, genres: ['Horror', 'Mystery'], full: 'https://www.youtube.com/embed/h74AXqw4Opc',
    desc: 'In the next installment, the survivors of the Ghostface killings leave Woodsboro behind and start a fresh chapter in New York City.',
    poster: 'https://image.tmdb.org/t/p/w500/wDWwtvkRRlgTiUr6TyLSMX8FCjz.jpg', bg: 'https://image.tmdb.org/t/p/w1280/bBRlrpJm9XkArtcVcgqmyZP7oG.jpg', dir: 'Matt Bettinelli-Olpin',
    cast: ['Melissa Barrera|https://image.tmdb.org/t/p/w200/bBRlrpJm9XkArtcVcgqmyZP7oG.jpg', 'Jenna Ortega|https://image.tmdb.org/t/p/w200/bBRlrpJm9XkArtcVcgqmyZP7oG.jpg'] }
];

const parsedMovies = movieData.map((m, i) => {
  return {
    id: m.id,
    title: m.title,
    year: m.year,
    genres: m.genres,
    rating: parseFloat((7.0 + (i % 2) + (i % 3) * 0.4).toFixed(1)), // Ratings between 7.0 and 8.8
    duration: `2h ${15 + i}min`,
    description: m.desc,
    posterUrl: m.poster,
    backdropUrl: m.bg,
    trailerUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    languages: ["English"],
    isNew: m.year >= 2023,
    isTrending: i % 3 === 0,
    topRank: i < 5 ? i + 1 : null,
    director: {
      name: m.dir,
      origin: "USA",
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/e/e0/Joseph_Kosinski_2013.jpg" // generic valid fallback
    },
    cast: m.cast.map(c => {
      const [name, img] = c.split('|');
      return { name, imageUrl: img };
    }),
    reviews: [
      {
        author: "Cinephile_" + i,
        from: "USA",
        rating: 5,
        text: "Absolutely fantastic! " + m.title + " is a must-watch."
      }
    ],
    fullMovieUrl: m.full
  }
});

fs.writeFileSync('src/data/movies.json', JSON.stringify(parsedMovies, null, 2));
console.log('movies.json updated successfully with 20 modern movies!');
