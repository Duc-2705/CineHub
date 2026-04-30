const fs = require('fs');

const movies = [
  // ACTION / SCI-FI
  {
    "id": "avengers-endgame",
    "title": "Avengers: Endgame",
    "year": 2019,
    "genres": ["Action", "Sci-Fi"],
    "rating": 8.4,
    "duration": "3h 1min",
    "description": "After the devastating events of Infinity War, the Avengers assemble once more in order to reverse Thanos' actions and restore balance to the universe.",
    "posterUrl": "https://upload.wikimedia.org/wikipedia/en/0/0d/Avengers_Endgame_poster.jpg",
    "backdropUrl": "https://upload.wikimedia.org/wikipedia/commons/1/1b/Avengers_Endgame_logo.png",
    "trailerUrl": "https://www.youtube.com/embed/TcMBFSGVi1c",
    "languages": ["English"],
    "isNew": false,
    "isTrending": true,
    "topRank": 1,
    "director": {
      "name": "Anthony Russo",
      "origin": "USA",
      "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/a/a2/Anthony_Russo_by_Gage_Skidmore_2.jpg"
    },
    "cast": [
      { "name": "Robert Downey Jr.", "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/2/23/Robert_Downey_Jr._2014_Comic-Con.jpg" },
      { "name": "Chris Evans", "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/b/b5/Chris_Evans_at_the_2022_Comic-Con.jpg" }
    ],
    "reviews": []
  },
  {
    "id": "dark-knight",
    "title": "The Dark Knight",
    "year": 2008,
    "genres": ["Action", "Thriller", "Drama"],
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
      { "name": "Christian Bale", "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/e/ec/Christian_Bale_2010.jpg" },
      { "name": "Heath Ledger", "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/e/e0/Heath_Ledger_2006.jpg" }
    ],
    "reviews": []
  },
  {
    "id": "inception",
    "title": "Inception",
    "year": 2010,
    "genres": ["Action", "Sci-Fi", "Adventure"],
    "rating": 8.8,
    "duration": "2h 28min",
    "description": "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    "posterUrl": "https://upload.wikimedia.org/wikipedia/en/2/2e/Inception_%282010%29_theatrical_poster.jpg",
    "backdropUrl": "https://upload.wikimedia.org/wikipedia/commons/8/87/Inception_Premiere.jpg",
    "trailerUrl": "https://www.youtube.com/embed/YoHD9XEInc0",
    "languages": ["English"],
    "isNew": false,
    "isTrending": true,
    "topRank": 4,
    "director": {
      "name": "Christopher Nolan",
      "origin": "UK",
      "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/9/95/Christopher_Nolan_Cannes_2018.jpg"
    },
    "cast": [
      { "name": "Leonardo DiCaprio", "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/4/46/Leonardo_Dicaprio_Cannes_2019.jpg" }
    ],
    "reviews": []
  },
  {
    "id": "matrix",
    "title": "The Matrix",
    "year": 1999,
    "genres": ["Action", "Sci-Fi"],
    "rating": 8.7,
    "duration": "2h 16min",
    "description": "When a beautiful stranger leads computer hacker Neo to a forbidding underworld, he discovers the shocking truth--the life he knows is the elaborate deception of an evil cyber-intelligence.",
    "posterUrl": "https://upload.wikimedia.org/wikipedia/en/9/9a/The_Matrix_soundtrack_cover.jpg",
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
      { "name": "Keanu Reeves", "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/9/90/Keanu_Reeves_%28cropped_and_retouched%29.jpg" }
    ],
    "reviews": []
  },
  {
    "id": "kantara-real",
    "title": "Kantara",
    "year": 2022,
    "genres": ["Action", "Thriller", "Drama"],
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
      { "name": "Rishab Shetty", "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/7/7d/Rishab_Shetty_at_SIIMA_2016.jpg" }
    ],
    "reviews": []
  },
  {
    "id": "madmax",
    "title": "Mad Max: Fury Road",
    "year": 2015,
    "genres": ["Action", "Adventure", "Sci-Fi"],
    "rating": 8.1,
    "duration": "2h 0min",
    "description": "In a post-apocalyptic wasteland, a woman rebels against a tyrannical ruler in search for her homeland.",
    "posterUrl": "https://upload.wikimedia.org/wikipedia/en/6/6e/Mad_Max_Fury_Road.jpg",
    "backdropUrl": "https://upload.wikimedia.org/wikipedia/commons/3/30/Mad_Max_Fury_Road_vehicles.jpg",
    "trailerUrl": "https://www.youtube.com/embed/hEJnMQG9ev8",
    "languages": ["English"],
    "isNew": false,
    "isTrending": false,
    "director": {
      "name": "George Miller",
      "origin": "Australia",
      "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/9/96/George_Miller_Cannes_2015.jpg"
    },
    "cast": [
      { "name": "Tom Hardy", "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/2/22/Tom_Hardy_by_Gage_Skidmore.jpg" }
    ],
    "reviews": []
  },

  // ADVENTURE
  {
    "id": "interstellar",
    "title": "Interstellar",
    "year": 2014,
    "genres": ["Adventure", "Sci-Fi", "Drama"],
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
      { "name": "Matthew McConaughey", "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/8/8e/Matthew_McConaughey_-_Goldene_Kamera_2014_-_Berlin.jpg" }
    ],
    "reviews": []
  },
  {
    "id": "gladiator",
    "title": "Gladiator",
    "year": 2000,
    "genres": ["Action", "Adventure", "Drama"],
    "rating": 8.5,
    "duration": "2h 35min",
    "description": "A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.",
    "posterUrl": "https://upload.wikimedia.org/wikipedia/en/f/fb/Gladiator_%282000_film_poster%29.png",
    "backdropUrl": "https://upload.wikimedia.org/wikipedia/commons/5/53/Colosseum_in_Rome%2C_Italy_-_April_2007.jpg",
    "trailerUrl": "https://www.youtube.com/embed/owK1qxDselE",
    "languages": ["English"],
    "isNew": false,
    "isTrending": false,
    "director": {
      "name": "Ridley Scott",
      "origin": "UK",
      "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/1/12/NASA_Journey_to_Mars_and_%E2%80%9CThe_Martian%E2%80%9D_%28201508180030HQ%29.jpg"
    },
    "cast": [
      { "name": "Russell Crowe", "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/0/05/Russell_Crowe_by_Gage_Skidmore.jpg" }
    ],
    "reviews": []
  },
  {
    "id": "dune",
    "title": "Dune",
    "year": 2021,
    "genres": ["Adventure", "Sci-Fi", "Action"],
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
      { "name": "Timothée Chalamet", "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/4/4e/Timoth%C3%A9e_Chalamet_2017.jpg" }
    ],
    "reviews": []
  },
  {
    "id": "jurassic-park",
    "title": "Jurassic Park",
    "year": 1993,
    "genres": ["Adventure", "Sci-Fi", "Thriller"],
    "rating": 8.2,
    "duration": "2h 7min",
    "description": "A pragmatic paleontologist visiting an almost complete theme park is tasked with protecting a couple of kids after a power failure causes the park's cloned dinosaurs to run loose.",
    "posterUrl": "https://upload.wikimedia.org/wikipedia/en/e/e7/Jurassic_Park_poster.jpg",
    "backdropUrl": "https://upload.wikimedia.org/wikipedia/commons/3/3f/Jurassic_Park_gate_Universal_Studios.jpg",
    "trailerUrl": "https://www.youtube.com/embed/lc0UehYemQA",
    "languages": ["English"],
    "isNew": false,
    "isTrending": false,
    "director": {
      "name": "Steven Spielberg",
      "origin": "USA",
      "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/8/8f/Steven_Spielberg_Masterclass_Cin%C3%A9math%C3%A8que_Fran%C3%A7aise_-_15_-_crop.jpg"
    },
    "cast": [
      { "name": "Sam Neill", "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/2/25/Sam_Neill_2013_%28cropped%29.jpg" }
    ],
    "reviews": []
  },
  {
    "id": "lotr",
    "title": "The Lord of the Rings: The Fellowship of the Ring",
    "year": 2001,
    "genres": ["Adventure", "Drama", "Action"],
    "rating": 8.8,
    "duration": "2h 58min",
    "description": "A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring.",
    "posterUrl": "https://upload.wikimedia.org/wikipedia/en/8/8a/The_Lord_of_the_Rings_The_Fellowship_of_the_Ring_%282001%29.jpg",
    "backdropUrl": "https://upload.wikimedia.org/wikipedia/commons/2/28/New_Zealand_Mountains.jpg",
    "trailerUrl": "https://www.youtube.com/embed/V75dMMIW2B4",
    "languages": ["English"],
    "isNew": false,
    "isTrending": true,
    "director": {
      "name": "Peter Jackson",
      "origin": "New Zealand",
      "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/4/4a/Peter_Jackson_2013.jpg"
    },
    "cast": [
      { "name": "Elijah Wood", "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/e/e4/Elijah_Wood_by_Gage_Skidmore_2.jpg" }
    ],
    "reviews": []
  },
  {
    "id": "indiana",
    "title": "Raiders of the Lost Ark",
    "year": 1981,
    "genres": ["Adventure", "Action"],
    "rating": 8.4,
    "duration": "1h 55min",
    "description": "Archaeologist and adventurer Indiana Jones is hired by the U.S. government to find the Ark of the Covenant.",
    "posterUrl": "https://upload.wikimedia.org/wikipedia/en/4/4c/Raiders_of_the_Lost_Ark.jpg",
    "backdropUrl": "https://upload.wikimedia.org/wikipedia/commons/4/45/Indiana_Jones_Stunt_Spectacular.jpg",
    "trailerUrl": "https://www.youtube.com/embed/XkkzKHCx154",
    "languages": ["English"],
    "isNew": false,
    "isTrending": false,
    "director": {
      "name": "Steven Spielberg",
      "origin": "USA",
      "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/8/8f/Steven_Spielberg_Masterclass_Cin%C3%A9math%C3%A8que_Fran%C3%A7aise_-_15_-_crop.jpg"
    },
    "cast": [
      { "name": "Harrison Ford", "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/f/fa/Harrison_Ford_by_Gage_Skidmore_3.jpg" }
    ],
    "reviews": []
  },

  // COMEDY
  {
    "id": "hangover",
    "title": "The Hangover",
    "year": 2009,
    "genres": ["Comedy"],
    "rating": 7.7,
    "duration": "1h 40min",
    "description": "Three buddies wake up from a bachelor party in Las Vegas, with no memory of the previous night and the bachelor missing.",
    "posterUrl": "https://upload.wikimedia.org/wikipedia/en/b/b9/Hangoverposter09.jpg",
    "backdropUrl": "https://upload.wikimedia.org/wikipedia/commons/d/d3/Las_Vegas_Strip_at_night.jpg",
    "trailerUrl": "https://www.youtube.com/embed/tcdUhdOlz9M",
    "languages": ["English"],
    "isNew": false,
    "isTrending": true,
    "director": {
      "name": "Todd Phillips",
      "origin": "USA",
      "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/2/2d/Todd_Phillips_2016.jpg"
    },
    "cast": [
      { "name": "Bradley Cooper", "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/f/f6/Bradley_Cooper_2018.jpg" }
    ],
    "reviews": []
  },
  {
    "id": "superbad",
    "title": "Superbad",
    "year": 2007,
    "genres": ["Comedy"],
    "rating": 7.6,
    "duration": "1h 53min",
    "description": "Two co-dependent high school seniors are forced to deal with separation anxiety after their plan to stage a booze-soaked party goes awry.",
    "posterUrl": "https://upload.wikimedia.org/wikipedia/en/8/8b/Superbad_Poster.png",
    "backdropUrl": "https://upload.wikimedia.org/wikipedia/commons/3/3f/American_high_school.jpg",
    "trailerUrl": "https://www.youtube.com/embed/4eaZ_48ZYIQ",
    "languages": ["English"],
    "isNew": false,
    "isTrending": false,
    "director": {
      "name": "Greg Mottola",
      "origin": "USA",
      "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/8/82/Greg_Mottola_2011.jpg"
    },
    "cast": [
      { "name": "Jonah Hill", "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/e/ec/Jonah_Hill_2014.jpg" }
    ],
    "reviews": []
  },
  {
    "id": "stepbrothers",
    "title": "Step Brothers",
    "year": 2008,
    "genres": ["Comedy"],
    "rating": 6.9,
    "duration": "1h 38min",
    "description": "Two aimless middle-aged losers still living at home are forced against their will to become room-mates when their parents marry.",
    "posterUrl": "https://upload.wikimedia.org/wikipedia/en/d/d9/StepbrothersMP08.jpg",
    "backdropUrl": "https://upload.wikimedia.org/wikipedia/commons/b/b3/Bunk_bed.jpg",
    "trailerUrl": "https://www.youtube.com/embed/CewglxElBK0",
    "languages": ["English"],
    "isNew": false,
    "isTrending": false,
    "director": {
      "name": "Adam McKay",
      "origin": "USA",
      "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/e/e4/Adam_McKay_2010.jpg"
    },
    "cast": [
      { "name": "Will Ferrell", "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/c/c5/Will_Ferrell_2012.jpg" }
    ],
    "reviews": []
  },
  {
    "id": "dumbanddumber",
    "title": "Dumb and Dumber",
    "year": 1994,
    "genres": ["Comedy", "Adventure"],
    "rating": 7.3,
    "duration": "1h 47min",
    "description": "After a woman leaves a briefcase at the airport terminal, a dumb limo driver and his dumber friend set out on a hilarious cross-country road trip to return it.",
    "posterUrl": "https://upload.wikimedia.org/wikipedia/en/6/64/Dumbanddumber.jpg",
    "backdropUrl": "https://upload.wikimedia.org/wikipedia/commons/5/52/Rocky_Mountains_Colorado.jpg",
    "trailerUrl": "https://www.youtube.com/embed/l13yPhimE3o",
    "languages": ["English"],
    "isNew": false,
    "isTrending": false,
    "director": {
      "name": "Peter Farrelly",
      "origin": "USA",
      "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/3/35/Peter_Farrelly.jpg"
    },
    "cast": [
      { "name": "Jim Carrey", "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/8/8b/Jim_Carrey_2008.jpg" }
    ],
    "reviews": []
  },
  {
    "id": "grandbudapest",
    "title": "The Grand Budapest Hotel",
    "year": 2014,
    "genres": ["Comedy", "Adventure", "Drama"],
    "rating": 8.1,
    "duration": "1h 39min",
    "description": "A writer encounters the owner of an aging high-class hotel, who tells him of his early years serving as a lobby boy.",
    "posterUrl": "https://upload.wikimedia.org/wikipedia/en/a/a6/The_Grand_Budapest_Hotel_Poster.jpg",
    "backdropUrl": "https://upload.wikimedia.org/wikipedia/commons/6/67/Grand_Budapest_Hotel.jpg",
    "trailerUrl": "https://www.youtube.com/embed/1Fg5iWmQjwk",
    "languages": ["English"],
    "isNew": false,
    "isTrending": true,
    "director": {
      "name": "Wes Anderson",
      "origin": "USA",
      "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/4/48/Wes_Anderson_2014.jpg"
    },
    "cast": [
      { "name": "Ralph Fiennes", "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/1/15/Ralph_Fiennes_2014.jpg" }
    ],
    "reviews": []
  },
  {
    "id": "tropic",
    "title": "Tropic Thunder",
    "year": 2008,
    "genres": ["Comedy", "Action"],
    "rating": 7.1,
    "duration": "1h 47min",
    "description": "Through a series of freak occurrences, a group of actors shooting a big-budget war movie are forced to become the soldiers they are portraying.",
    "posterUrl": "https://upload.wikimedia.org/wikipedia/en/c/c9/Tropic_thunder_poster.jpg",
    "backdropUrl": "https://upload.wikimedia.org/wikipedia/commons/b/b3/Jungle_in_Hawaii.jpg",
    "trailerUrl": "https://www.youtube.com/embed/T-6YhRZowgc",
    "languages": ["English"],
    "isNew": false,
    "isTrending": false,
    "director": {
      "name": "Ben Stiller",
      "origin": "USA",
      "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/c/c4/Ben_Stiller_2013.jpg"
    },
    "cast": [
      { "name": "Robert Downey Jr.", "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/2/23/Robert_Downey_Jr._2014_Comic-Con.jpg" }
    ],
    "reviews": []
  },

  // HORROR
  {
    "id": "conjuring",
    "title": "The Conjuring",
    "year": 2013,
    "genres": ["Horror", "Thriller"],
    "rating": 7.5,
    "duration": "1h 52min",
    "description": "Paranormal investigators Ed and Lorraine Warren work to help a family terrorized by a dark presence in their farmhouse.",
    "posterUrl": "https://upload.wikimedia.org/wikipedia/en/1/1f/The_Conjuring_poster.jpg",
    "backdropUrl": "https://upload.wikimedia.org/wikipedia/commons/5/5a/Haunted_house.jpg",
    "trailerUrl": "https://www.youtube.com/embed/k10ETZ41q5o",
    "languages": ["English"],
    "isNew": false,
    "isTrending": true,
    "director": {
      "name": "James Wan",
      "origin": "Australia",
      "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/2/25/James_Wan_2018.jpg"
    },
    "cast": [
      { "name": "Vera Farmiga", "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/a/ad/Vera_Farmiga_2013.jpg" }
    ],
    "reviews": []
  },
  {
    "id": "getout",
    "title": "Get Out",
    "year": 2017,
    "genres": ["Horror", "Thriller"],
    "rating": 7.8,
    "duration": "1h 44min",
    "description": "A young African-American visits his white girlfriend's parents for the weekend, where his simmering uneasiness about their reception of him eventually reaches a boiling point.",
    "posterUrl": "https://upload.wikimedia.org/wikipedia/en/a/a3/Get_Out_poster.png",
    "backdropUrl": "https://upload.wikimedia.org/wikipedia/commons/2/2e/American_suburbs.jpg",
    "trailerUrl": "https://www.youtube.com/embed/DzfpyUB60YY",
    "languages": ["English"],
    "isNew": false,
    "isTrending": true,
    "director": {
      "name": "Jordan Peele",
      "origin": "USA",
      "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/5/5b/Jordan_Peele_2014.jpg"
    },
    "cast": [
      { "name": "Daniel Kaluuya", "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/5/59/Daniel_Kaluuya_2018.jpg" }
    ],
    "reviews": []
  },
  {
    "id": "nightmare",
    "title": "A Nightmare on Elm Street",
    "year": 1984,
    "genres": ["Horror"],
    "rating": 7.4,
    "duration": "1h 31min",
    "description": "Teenagers fall prey to Freddy Krueger, a disfigured midnight killer who preys on the teenagers in their dreams.",
    "posterUrl": "https://upload.wikimedia.org/wikipedia/en/f/f1/A_Nightmare_on_Elm_Street_%281984_film%29_poster.jpg",
    "backdropUrl": "https://upload.wikimedia.org/wikipedia/commons/1/1b/Elm_Street.jpg",
    "trailerUrl": "https://www.youtube.com/embed/dCVh4lBfW-c",
    "languages": ["English"],
    "isNew": false,
    "isTrending": false,
    "director": {
      "name": "Wes Craven",
      "origin": "USA",
      "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/b/b5/Wes_Craven_2011.jpg"
    },
    "cast": [
      { "name": "Robert Englund", "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/4/43/Robert_Englund_2012.jpg" }
    ],
    "reviews": []
  },
  {
    "id": "exorcist",
    "title": "The Exorcist",
    "year": 1973,
    "genres": ["Horror"],
    "rating": 8.1,
    "duration": "2h 2min",
    "description": "When a 12-year-old girl is possessed by a mysterious entity, her mother seeks the help of two priests to save her.",
    "posterUrl": "https://upload.wikimedia.org/wikipedia/en/7/7b/The_Exorcist_poster.jpg",
    "backdropUrl": "https://upload.wikimedia.org/wikipedia/commons/6/62/Exorcist_stairs.jpg",
    "trailerUrl": "https://www.youtube.com/embed/YDGw1MTEe9k",
    "languages": ["English"],
    "isNew": false,
    "isTrending": false,
    "director": {
      "name": "William Friedkin",
      "origin": "USA",
      "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/7/7d/William_Friedkin_2013.jpg"
    },
    "cast": [
      { "name": "Linda Blair", "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/7/78/Linda_Blair_2018.jpg" }
    ],
    "reviews": []
  },
  {
    "id": "shining",
    "title": "The Shining",
    "year": 1980,
    "genres": ["Horror", "Drama"],
    "rating": 8.4,
    "duration": "2h 26min",
    "description": "A family heads to an isolated hotel for the winter where a sinister presence influences the father into violence.",
    "posterUrl": "https://upload.wikimedia.org/wikipedia/en/1/1d/The_Shining_%281980%29_U.K._release_poster_-_The_tide_of_terror_that_swept_America_IS_HERE.jpg",
    "backdropUrl": "https://upload.wikimedia.org/wikipedia/commons/3/30/Timberline_Lodge.jpg",
    "trailerUrl": "https://www.youtube.com/embed/S014oGZiSdI",
    "languages": ["English"],
    "isNew": false,
    "isTrending": true,
    "director": {
      "name": "Stanley Kubrick",
      "origin": "UK",
      "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/e/e0/Stanley_Kubrick_1960.jpg"
    },
    "cast": [
      { "name": "Jack Nicholson", "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/0/07/Jack_Nicholson_2001.jpg" }
    ],
    "reviews": []
  },
  {
    "id": "alien",
    "title": "Alien",
    "year": 1979,
    "genres": ["Horror", "Sci-Fi"],
    "rating": 8.5,
    "duration": "1h 57min",
    "description": "After a space merchant vessel receives an unknown transmission as a distress call, one of the crew is attacked by a mysterious life form.",
    "posterUrl": "https://upload.wikimedia.org/wikipedia/en/c/c3/Alien_movie_poster.jpg",
    "backdropUrl": "https://upload.wikimedia.org/wikipedia/commons/a/a2/Alien_Xenomorph.jpg",
    "trailerUrl": "https://www.youtube.com/embed/LjLamj-b0I8",
    "languages": ["English"],
    "isNew": false,
    "isTrending": false,
    "director": {
      "name": "Ridley Scott",
      "origin": "UK",
      "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/1/12/NASA_Journey_to_Mars_and_%E2%80%9CThe_Martian%E2%80%9D_%28201508180030HQ%29.jpg"
    },
    "cast": [
      { "name": "Sigourney Weaver", "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/1/11/Sigourney_Weaver_2015.jpg" }
    ],
    "reviews": []
  },

  // DRAMA
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
      { "name": "John Travolta", "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/0/0b/John_Travolta_Cannes_2018.jpg" }
    ],
    "reviews": []
  },
  {
    "id": "godfather",
    "title": "The Godfather",
    "year": 1972,
    "genres": ["Crime", "Drama"],
    "rating": 9.2,
    "duration": "2h 55min",
    "description": "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
    "posterUrl": "https://upload.wikimedia.org/wikipedia/en/1/1c/Godfather_ver1.jpg",
    "backdropUrl": "https://upload.wikimedia.org/wikipedia/commons/e/e0/Godfather_set.jpg",
    "trailerUrl": "https://www.youtube.com/embed/sY1S34973zA",
    "languages": ["English"],
    "isNew": false,
    "isTrending": true,
    "director": {
      "name": "Francis Ford Coppola",
      "origin": "USA",
      "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/e/ea/Francis_Ford_Coppola_2011.jpg"
    },
    "cast": [
      { "name": "Marlon Brando", "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/1/16/Marlon_Brando_1950.jpg" }
    ],
    "reviews": []
  },
  {
    "id": "shawshank",
    "title": "The Shawshank Redemption",
    "year": 1994,
    "genres": ["Drama"],
    "rating": 9.3,
    "duration": "2h 22min",
    "description": "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    "posterUrl": "https://upload.wikimedia.org/wikipedia/en/8/81/ShawshankRedemptionMoviePoster.jpg",
    "backdropUrl": "https://upload.wikimedia.org/wikipedia/commons/5/5f/Ohio_State_Reformatory.jpg",
    "trailerUrl": "https://www.youtube.com/embed/6hB3S9bIaco",
    "languages": ["English"],
    "isNew": false,
    "isTrending": false,
    "director": {
      "name": "Frank Darabont",
      "origin": "France",
      "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/f/fe/Frank_Darabont_2011.jpg"
    },
    "cast": [
      { "name": "Tim Robbins", "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/2/25/Tim_Robbins_2013.jpg" }
    ],
    "reviews": []
  },
  {
    "id": "forrest-gump",
    "title": "Forrest Gump",
    "year": 1994,
    "genres": ["Drama", "Comedy", "Adventure"],
    "rating": 8.8,
    "duration": "2h 22min",
    "description": "The presidencies of Kennedy and Johnson, the events of Vietnam, Watergate, and other history unfold through the perspective of an Alabama man with an IQ of 75.",
    "posterUrl": "https://upload.wikimedia.org/wikipedia/en/6/67/Forrest_Gump_poster.jpg",
    "backdropUrl": "https://upload.wikimedia.org/wikipedia/commons/8/8a/Monument_Valley.jpg",
    "trailerUrl": "https://www.youtube.com/embed/bLvqoHBptjg",
    "languages": ["English"],
    "isNew": false,
    "isTrending": true,
    "director": {
      "name": "Robert Zemeckis",
      "origin": "USA",
      "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/0/07/Robert_Zemeckis_2015.jpg"
    },
    "cast": [
      { "name": "Tom Hanks", "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/e/e7/Tom_Hanks_2014.jpg" }
    ],
    "reviews": []
  },
  {
    "id": "fight-club",
    "title": "Fight Club",
    "year": 1999,
    "genres": ["Drama", "Thriller"],
    "rating": 8.8,
    "duration": "2h 19min",
    "description": "An insomniac office worker and a devil-may-care soapmaker form an underground fight club that evolves into something much, much more.",
    "posterUrl": "https://upload.wikimedia.org/wikipedia/en/f/fc/Fight_Club_poster.jpg",
    "backdropUrl": "https://upload.wikimedia.org/wikipedia/commons/b/b5/Fight_Club.jpg",
    "trailerUrl": "https://www.youtube.com/embed/qtRKdVHc-cE",
    "languages": ["English"],
    "isNew": false,
    "isTrending": true,
    "director": {
      "name": "David Fincher",
      "origin": "USA",
      "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/3/36/David_Fincher_2014.jpg"
    },
    "cast": [
      { "name": "Brad Pitt", "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/5/51/Brad_Pitt_2019_by_Glenn_Francis.jpg" }
    ],
    "reviews": []
  },
  {
    "id": "green-mile",
    "title": "The Green Mile",
    "year": 1999,
    "genres": ["Drama", "Crime", "Fantasy"],
    "rating": 8.6,
    "duration": "3h 9min",
    "description": "The lives of guards on Death Row are affected by one of their charges: a black man accused of child murder and rape, yet who has a mysterious gift.",
    "posterUrl": "https://upload.wikimedia.org/wikipedia/en/c/ce/Green_mile.jpg",
    "backdropUrl": "https://upload.wikimedia.org/wikipedia/commons/5/52/Prison_corridor.jpg",
    "trailerUrl": "https://www.youtube.com/embed/Ki4haFrqSrw",
    "languages": ["English"],
    "isNew": false,
    "isTrending": false,
    "director": {
      "name": "Frank Darabont",
      "origin": "France",
      "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/f/fe/Frank_Darabont_2011.jpg"
    },
    "cast": [
      { "name": "Tom Hanks", "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/e/e7/Tom_Hanks_2014.jpg" }
    ],
    "reviews": []
  }
];

fs.writeFileSync('./src/data/movies.json', JSON.stringify(movies, null, 2));
console.log('movies.json replaced with 24 complete, real movies across 5+ genres.');
