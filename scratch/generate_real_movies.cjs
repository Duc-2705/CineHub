const fs = require('fs');

const movies = [
  {
    "id": "avengers-endgame",
    "title": "Avengers: Endgame",
    "year": 2019,
    "genres": ["Action", "Sci-Fi"],
    "rating": 8.4,
    "duration": "3h 1min",
    "description": "After the devastating events of Infinity War, the Avengers assemble once more in order to reverse Thanos' actions and restore balance to the universe.",
    "posterUrl": "https://upload.wikimedia.org/wikipedia/en/0/0d/Avengers_Endgame_poster.jpg",
    "backdropUrl": "https://upload.wikimedia.org/wikipedia/commons/e/e4/Avengers_Endgame_Cast_at_SDCC_2019_%28cropped%29.jpg",
    "trailerUrl": "https://www.youtube.com/embed/TcMBFSGVi1c",
    "languages": ["English"],
    "isNew": false,
    "isTrending": true,
    "topRank": 1,
    "director": {
      "name": "Anthony Russo",
      "origin": "USA",
      "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/e/eb/Anthony_Russo_%2848464303916%29.jpg"
    },
    "cast": [
      {
        "name": "Robert Downey Jr.",
        "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/2/23/Robert_Downey_Jr._2014_Comic-Con.jpg"
      },
      {
        "name": "Chris Evans",
        "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/b/b5/Chris_Evans_at_the_2022_Comic-Con.jpg"
      },
      {
        "name": "Scarlett Johansson",
        "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/2/2a/Scarlett_Johansson_by_Gage_Skidmore_2_%28cropped%29.jpg"
      }
    ],
    "reviews": [
      { "author": "Mike Chen", "from": "USA", "rating": 5.0, "text": "The perfect conclusion to a decade of storytelling." },
      { "author": "Emma Watson", "from": "UK", "rating": 4.5, "text": "Epic in every sense of the word." }
    ]
  },
  {
    "id": "interstellar",
    "title": "Interstellar",
    "year": 2014,
    "genres": ["Adventure", "Sci-Fi"],
    "rating": 8.6,
    "duration": "2h 49min",
    "description": "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    "posterUrl": "https://upload.wikimedia.org/wikipedia/en/b/bc/Interstellar_film_poster.jpg",
    "backdropUrl": "https://upload.wikimedia.org/wikipedia/commons/f/fb/Interstellar_water_world.jpg",
    "trailerUrl": "https://www.youtube.com/embed/zSWdZVtXT7E",
    "languages": ["English"],
    "isNew": false,
    "isTrending": true,
    "topRank": 2,
    "director": {
      "name": "Christopher Nolan",
      "origin": "UK",
      "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/9/95/Christopher_Nolan_Cannes_2018.jpg"
    },
    "cast": [
      {
        "name": "Matthew McConaughey",
        "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/8/8e/Matthew_McConaughey_-_Goldene_Kamera_2014_-_Berlin.jpg"
      },
      {
        "name": "Anne Hathaway",
        "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/e/e1/Anne_Hathaway_at_the_2007_Deauville_American_Film_Festival-01.jpg"
      },
      {
        "name": "Jessica Chastain",
        "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/f/f6/Jessica_Chastain_2014.jpg"
      }
    ],
    "reviews": [
      { "author": "David Smith", "from": "Canada", "rating": 5.0, "text": "A breathtaking visual and emotional journey." }
    ]
  },
  {
    "id": "dark-knight",
    "title": "The Dark Knight",
    "year": 2008,
    "genres": ["Action", "Thriller"],
    "rating": 9.0,
    "duration": "2h 32min",
    "description": "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    "posterUrl": "https://upload.wikimedia.org/wikipedia/en/1/1c/The_Dark_Knight_%282008_film%29.jpg",
    "backdropUrl": "https://upload.wikimedia.org/wikipedia/commons/e/e8/The_Dark_Knight_set.jpg",
    "trailerUrl": "https://www.youtube.com/embed/EXeTwQWrcwY",
    "languages": ["English"],
    "isNew": false,
    "isTrending": true,
    "topRank": 3,
    "director": {
      "name": "Christopher Nolan",
      "origin": "UK",
      "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/9/95/Christopher_Nolan_Cannes_2018.jpg"
    },
    "cast": [
      {
        "name": "Christian Bale",
        "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/e/ec/Christian_Bale_2010.jpg"
      },
      {
        "name": "Heath Ledger",
        "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/e/e0/Heath_Ledger_2006.jpg"
      },
      {
        "name": "Gary Oldman",
        "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/3/30/Gary_Oldman_Cannes_2011.jpg"
      }
    ],
    "reviews": [
      { "author": "Sarah Connor", "from": "USA", "rating": 5.0, "text": "Heath Ledger's Joker is legendary." }
    ]
  },
  {
    "id": "inception",
    "title": "Inception",
    "year": 2010,
    "genres": ["Action", "Sci-Fi"],
    "rating": 8.8,
    "duration": "2h 28min",
    "description": "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    "posterUrl": "https://upload.wikimedia.org/wikipedia/en/2/2e/Inception_%282010%29_theatrical_poster.jpg",
    "backdropUrl": "https://upload.wikimedia.org/wikipedia/commons/8/87/Inception_Premiere.jpg",
    "trailerUrl": "https://www.youtube.com/embed/YoHD9XEInc0",
    "languages": ["English", "Japanese"],
    "isNew": false,
    "isTrending": true,
    "topRank": 4,
    "director": {
      "name": "Christopher Nolan",
      "origin": "UK",
      "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/9/95/Christopher_Nolan_Cannes_2018.jpg"
    },
    "cast": [
      {
        "name": "Leonardo DiCaprio",
        "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/4/46/Leonardo_Dicaprio_Cannes_2019.jpg"
      },
      {
        "name": "Joseph Gordon-Levitt",
        "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/e/ec/Joseph_Gordon-Levitt_2013.jpg"
      },
      {
        "name": "Elliot Page",
        "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/3/3f/Elliot_Page_2024_%28cropped%29.jpg"
      }
    ],
    "reviews": [
      { "author": "John Doe", "from": "USA", "rating": 5.0, "text": "Mind-bending!" }
    ]
  },
  {
    "id": "gladiator",
    "title": "Gladiator",
    "year": 2000,
    "genres": ["Action", "Adventure"],
    "rating": 8.5,
    "duration": "2h 35min",
    "description": "A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.",
    "posterUrl": "https://upload.wikimedia.org/wikipedia/en/f/fb/Gladiator_%282000_film_poster%29.png",
    "backdropUrl": "https://upload.wikimedia.org/wikipedia/commons/e/e0/Gladiator_movie_set_in_Morocco.jpg",
    "trailerUrl": "https://www.youtube.com/embed/owK1qxDselE",
    "languages": ["English"],
    "isNew": false,
    "isTrending": false,
    "topRank": null,
    "director": {
      "name": "Ridley Scott",
      "origin": "UK",
      "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/1/12/Ridley_Scott_by_Gage_Skidmore.jpg"
    },
    "cast": [
      {
        "name": "Russell Crowe",
        "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/0/05/Russell_Crowe_by_Gage_Skidmore.jpg"
      },
      {
        "name": "Joaquin Phoenix",
        "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/5/53/Joaquin_Phoenix_2018.jpg"
      }
    ],
    "reviews": [
      { "author": "Maximus", "from": "Italy", "rating": 5.0, "text": "Are you not entertained?!" }
    ]
  },
  {
    "id": "matrix",
    "title": "The Matrix",
    "year": 1999,
    "genres": ["Action", "Sci-Fi"],
    "rating": 8.7,
    "duration": "2h 16min",
    "description": "When a beautiful stranger leads computer hacker Neo to a forbidding underworld, he discovers the shocking truth--the life he knows is the elaborate deception of an evil cyber-intelligence.",
    "posterUrl": "https://upload.wikimedia.org/wikipedia/en/c/c1/The_Matrix_Poster.jpg",
    "backdropUrl": "https://upload.wikimedia.org/wikipedia/commons/6/6b/Matrix_code.jpg",
    "trailerUrl": "https://www.youtube.com/embed/vKQi3bBA1y8",
    "languages": ["English"],
    "isNew": false,
    "isTrending": true,
    "topRank": 5,
    "director": {
      "name": "Lana Wachowski",
      "origin": "USA",
      "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/5/5c/Lana_Wachowski_at_the_2012_Toronto_International_Film_Festival.jpg"
    },
    "cast": [
      {
        "name": "Keanu Reeves",
        "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/9/90/Keanu_Reeves_%28cropped_and_retouched%29.jpg"
      },
      {
        "name": "Laurence Fishburne",
        "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/7/77/Laurence_Fishburne_2016.jpg"
      },
      {
        "name": "Carrie-Anne Moss",
        "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/f/fb/Carrie-Anne_Moss_2016.jpg"
      }
    ],
    "reviews": [
      { "author": "Neo", "from": "USA", "rating": 5.0, "text": "Whoa." }
    ]
  },
  {
    "id": "dune",
    "title": "Dune",
    "year": 2021,
    "genres": ["Adventure", "Sci-Fi"],
    "rating": 8.0,
    "duration": "2h 35min",
    "description": "Feature adaptation of Frank Herbert's science fiction novel, about the son of a noble family entrusted with the protection of the most valuable asset and most vital element in the galaxy.",
    "posterUrl": "https://upload.wikimedia.org/wikipedia/en/8/8e/Dune_%282021_film%29.jpg",
    "backdropUrl": "https://upload.wikimedia.org/wikipedia/commons/c/c5/Dune_landscape.jpg",
    "trailerUrl": "https://www.youtube.com/embed/n9xhJrPXop4",
    "languages": ["English"],
    "isNew": true,
    "isTrending": true,
    "topRank": 6,
    "director": {
      "name": "Denis Villeneuve",
      "origin": "Canada",
      "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/3/30/Denis_Villeneuve_2017.jpg"
    },
    "cast": [
      {
        "name": "Timothée Chalamet",
        "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/4/4e/Timoth%C3%A9e_Chalamet_2017.jpg"
      },
      {
        "name": "Rebecca Ferguson",
        "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/3/3f/Rebecca_Ferguson_2018.jpg"
      },
      {
        "name": "Oscar Isaac",
        "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/e/ec/Oscar_Isaac_by_Gage_Skidmore.jpg"
      }
    ],
    "reviews": [
      { "author": "Paul A.", "from": "Canada", "rating": 4.5, "text": "Visually stunning." }
    ]
  },
  {
    "id": "jurassic-park",
    "title": "Jurassic Park",
    "year": 1993,
    "genres": ["Adventure", "Sci-Fi"],
    "rating": 8.2,
    "duration": "2h 7min",
    "description": "A pragmatic paleontologist visiting an almost complete theme park is tasked with protecting a couple of kids after a power failure causes the park's cloned dinosaurs to run loose.",
    "posterUrl": "https://upload.wikimedia.org/wikipedia/en/e/e7/Jurassic_Park_poster.jpg",
    "backdropUrl": "https://upload.wikimedia.org/wikipedia/commons/3/3f/Jurassic_Park_gate_Universal_Studios.jpg",
    "trailerUrl": "https://www.youtube.com/embed/lc0UehYemQA",
    "languages": ["English"],
    "isNew": false,
    "isTrending": false,
    "topRank": null,
    "director": {
      "name": "Steven Spielberg",
      "origin": "USA",
      "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/8/8f/Steven_Spielberg_Masterclass_Cin%C3%A9math%C3%A8que_Fran%C3%A7aise_-_15_-_crop.jpg"
    },
    "cast": [
      {
        "name": "Sam Neill",
        "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/2/25/Sam_Neill_2013_%28cropped%29.jpg"
      },
      {
        "name": "Laura Dern",
        "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/a/ae/Laura_Dern_at_TIFF_2014.jpg"
      },
      {
        "name": "Jeff Goldblum",
        "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/2/27/Jeff_Goldblum_by_Gage_Skidmore_2.jpg"
      }
    ],
    "reviews": [
      { "author": "Ian M.", "from": "USA", "rating": 5.0, "text": "Life finds a way." }
    ]
  },
  {
    "id": "kantara-real",
    "title": "Kantara",
    "year": 2022,
    "genres": ["Action", "Thriller"],
    "rating": 8.3,
    "duration": "2h 24min",
    "description": "A story rooted in the folklore and myths of a coastal Karnataka village.",
    "posterUrl": "https://upload.wikimedia.org/wikipedia/en/8/84/Kantara_poster.jpeg",
    "backdropUrl": "https://upload.wikimedia.org/wikipedia/commons/0/0f/Kantara_Movie_Set.jpg",
    "trailerUrl": "https://www.youtube.com/embed/8oOEw91i_B4",
    "languages": ["Kannada", "Hindi"],
    "isNew": false,
    "isTrending": true,
    "topRank": 7,
    "director": {
      "name": "Rishab Shetty",
      "origin": "India",
      "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/7/7d/Rishab_Shetty_at_SIIMA_2016.jpg"
    },
    "cast": [
      {
        "name": "Rishab Shetty",
        "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/7/7d/Rishab_Shetty_at_SIIMA_2016.jpg"
      },
      {
        "name": "Kishore",
        "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/8/85/Kishore_South_Indian_Actor.jpg"
      }
    ],
    "reviews": [
      { "author": "Anirudh", "from": "India", "rating": 5.0, "text": "Brilliant storytelling." }
    ]
  },
  {
    "id": "pulp-fiction",
    "title": "Pulp Fiction",
    "year": 1994,
    "genres": ["Crime", "Drama"],
    "rating": 8.9,
    "duration": "2h 34min",
    "description": "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    "posterUrl": "https://upload.wikimedia.org/wikipedia/en/3/3b/Pulp_Fiction_%281994%29_poster.jpg",
    "backdropUrl": "https://upload.wikimedia.org/wikipedia/commons/3/3f/Pulp_Fiction_Mia_Wallace.jpg",
    "trailerUrl": "https://www.youtube.com/embed/s7EdQ4FqbhY",
    "languages": ["English"],
    "isNew": false,
    "isTrending": true,
    "topRank": 8,
    "director": {
      "name": "Quentin Tarantino",
      "origin": "USA",
      "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/0/0b/Quentin_Tarantino_by_Gage_Skidmore.jpg"
    },
    "cast": [
      {
        "name": "John Travolta",
        "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/0/0b/John_Travolta_Cannes_2018.jpg"
      },
      {
        "name": "Uma Thurman",
        "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/1/14/Uma_Thurman_2014.jpg"
      },
      {
        "name": "Samuel L. Jackson",
        "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/2/29/Samuel_L._Jackson_2019_by_Glenn_Francis.jpg"
      }
    ],
    "reviews": [
      { "author": "Vincent", "from": "USA", "rating": 5.0, "text": "A classic." }
    ]
  }
];

fs.writeFileSync('./src/data/movies.json', JSON.stringify(movies, null, 2));
console.log('movies.json replaced with 10 real movies.');
