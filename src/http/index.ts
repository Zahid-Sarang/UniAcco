import axios from "axios";

export const getMovies = async (pageParam = 1) =>
	axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=38ea5e7c8561a585923cb35fd520dfa3&page=${pageParam}`);

export const getSingleMovie = async (movieId: number) =>
	axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=38ea5e7c8561a585923cb35fd520dfa3`);
