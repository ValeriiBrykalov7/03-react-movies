import axios from "axios";
import type { Movie } from "../types/movie";
import toast from "react-hot-toast";

interface MoviesHttpResponse {
  results: Movie[];
}
const errorMessage = () => toast.error("No movies found for your request.");
const myKey = import.meta.env.VITE_TMDB_TOKEN;

export const fetchMovies = async (query: string): Promise<Movie[]> => {
  const response = await axios.get<MoviesHttpResponse>(
    `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`,
    {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${myKey}`,
      },
    }
  );
  if (response.data.results.length === 0) {
    errorMessage();
  }
  return response.data.results;
};
