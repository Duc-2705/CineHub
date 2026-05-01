import defaultMovies from '../data/movies.json';

export const getMovies = () => {
  let movies = localStorage.getItem('cinehub_movies');
  if (!movies) {
    // Seed from movies.json
    localStorage.setItem('cinehub_movies', JSON.stringify(defaultMovies));
    return defaultMovies;
  }
  return JSON.parse(movies);
};

export const saveMovies = (movies) => {
  localStorage.setItem('cinehub_movies', JSON.stringify(movies));
};

export const getUsers = () => {
  return JSON.parse(localStorage.getItem('cinehub_users') || '[]');
};

export const saveUsers = (users) => {
  localStorage.setItem('cinehub_users', JSON.stringify(users));
};

export const getViews = () => {
  return JSON.parse(localStorage.getItem('cinehub_views') || '[]');
};

export const addView = (movieId) => {
  const views = getViews();
  views.push({
    movieId,
    date: new Date().toISOString()
  });
  localStorage.setItem('cinehub_views', JSON.stringify(views));
};

export const getSupportMessages = () => {
  return JSON.parse(localStorage.getItem('cinehub_support_messages') || '[]');
};

export const addSupportMessage = (messageData) => {
  const messages = getSupportMessages();
  messages.push({
    ...messageData,
    id: Date.now().toString(),
    status: 'pending',
    createdAt: new Date().toISOString()
  });
  localStorage.setItem('cinehub_support_messages', JSON.stringify(messages));
};

export const saveSupportMessages = (messages) => {
  localStorage.setItem('cinehub_support_messages', JSON.stringify(messages));
};
