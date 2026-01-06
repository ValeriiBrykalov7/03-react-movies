import { SearchBar } from "../SearchBar/SearchBar";
import type { Movie } from "../../types/movie";
import { useState } from "react";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";

import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { fetchMovies } from "../../services/movieService";
import MovieModal from "../MovieModal/MovieModal";

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentMovie, setCurrentMovie] = useState<Movie | null>(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentMovie(null);
  };

  const renderModal = (movie: Movie) => {
    openModal();
    setCurrentMovie(movie);
  };

  const handleQuery = async (query: string) => {
    try {
      setIsLoading(true);
      setIsError(false);

      const data = await fetchMovies(query);

      setMovies(data);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <SearchBar onSubmit={handleQuery} />
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {movies.length > 0 && (
        <MovieGrid movies={movies} onSelect={renderModal} />
      )}
      {isModalOpen && <MovieModal onClose={closeModal} movie={currentMovie} />}
    </>
  );
}
