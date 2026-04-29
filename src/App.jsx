import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import MoviesShowsPage from './pages/MoviesShowsPage'
import MovieDetailPage from './pages/MovieDetailPage'
import SubscriptionsPage from './pages/SubscriptionsPage'
import SupportPage from './pages/SupportPage'
import MyListPage from './pages/MyListPage'
import SearchPage from './pages/SearchPage'

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<MoviesShowsPage />} />
        <Route path="/movie/:id" element={<MovieDetailPage />} />
        <Route path="/subscriptions" element={<SubscriptionsPage />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="/my-list" element={<MyListPage />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
