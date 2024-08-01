import { useState, useMemo } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import { getMovies } from "./http";
import MovieCard from "./components/MovieCard";
import { IMoviesData } from "./types";
import { debounce } from "lodash";

const Home = () => {
	const [searchTerm, setSearchTerm] = useState("");

	const fetchMovies = async ({ pageParam = 1 }) => {
		const res = await getMovies(pageParam);
		return res.data;
	};

	const { data, isLoading, isError, fetchNextPage, hasNextPage } = useInfiniteQuery({
		queryKey: ["movies"],
		queryFn: fetchMovies,
		getNextPageParam: (lastPage) => {
			if (lastPage.page < lastPage.total_pages) {
				return lastPage.page + 1;
			} else {
				return undefined;
			}
		},
		initialPageParam: 1,
	});

	// Debouncing
	const debouncedQUpdate = useMemo(() => {
		return debounce((value: string) => {
			setSearchTerm(value);
		}, 500);
	}, []);

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		debouncedQUpdate(e.target.value);
	};

	if (isLoading) {
		return <h1>Loading....</h1>;
	}

	if (isError) {
		return <h1 className="text-red-500">Error while fetching API</h1>;
	}

	if (!data) {
		return <h1>Error while fetching data</h1>;
	}

	// Filter movies based on the search term
	const filteredMovies = data.pages
		.flatMap((page) => page.results)
		.filter((movie: IMoviesData) => movie.title.toLowerCase().includes(searchTerm.toLowerCase()));

	return (
		<div>
			<div className="sticky top-0 z-50 p-4 bg-white shadow-md">
				<input
					type="text"
					placeholder="Search movies..."
					onChange={handleSearch}
					className="w-full p-2 border rounded-md"
				/>
			</div>
			<InfiniteScroll
				dataLength={filteredMovies.length}
				next={fetchNextPage}
				hasMore={hasNextPage}
				loader={<h4>Loading...</h4>}
				endMessage={<p>No more movies to load</p>}
			>
				<div className="grid xm:grid-cols-1 sm:grid-cols-2 xs:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
					{filteredMovies.map((movie: IMoviesData) => (
						<MovieCard
							key={movie.id}
							id={movie.id}
							overview={movie.overview}
							poster_path={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
							title={movie.title}
							vote_average={movie.vote_average}
						/>
					))}
				</div>
			</InfiniteScroll>
		</div>
	);
};

export default Home;
