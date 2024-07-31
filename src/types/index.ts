export interface IMoviesData {
	id: number;
	adult: boolean;
	original_language: string;
	original_title: string;
	overview: string;
	poster_path: string;
	realease_date: string;
	title: string;
	vote_average: number;
	vote_count: number;
	release_date: string;
	budget: number;
	revenue: number;
	status: string;
	tagline: string;
	homepage: string;
}

export interface IMovies {
	page: number;
	results: IMoviesData[];
	total_results: number;
	total_pages: number;
}
