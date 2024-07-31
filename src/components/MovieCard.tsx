import { useMutation } from "@tanstack/react-query";
import { getSingleMovie } from "../http";
import MovieModal from "./MovieModal";
import { IMoviesData } from "../types";
import { useState } from "react";

interface IProps {
	id: number;
	overview: string;
	poster_path: string;
	title: string;
	vote_average: number;
}

const MovieCard = ({ overview, poster_path, title, vote_average, id }: IProps) => {
	const [isModalOpen, setModalOpen] = useState(false);
	const [movieData, setMovieData] = useState<IMoviesData | null>(null);

	const handleModalState = (state: boolean) => {
		setModalOpen(state);
	};

	const { mutate: fetchMovie, isPending } = useMutation<IMoviesData>({
		mutationKey: ["movie"],
		mutationFn: async () => {
			return getSingleMovie(id).then((res) => res.data);
		},
		onSuccess: (data) => {
			setMovieData(data);
			setModalOpen(true);
		},
		onError: (error) => {
			console.error("Error fetching movie:", error);
		},
	});

	const handleViewDetails = () => {
		fetchMovie();
	};

	if (isPending) {
		return <h1>Loading....</h1>;
	}

	return (
		<div className="max-w-sm m-4 overflow-hidden transition-transform transform rounded-lg shadow-lg hover:scale-105 hover:shadow-xl">
			<div className="relative">
				<img className="object-cover w-full h-64" src={poster_path} alt={title} />
			</div>
			<div className="px-6 py-4 bg-white">
				<div className="flex items-center justify-between mb-4">
					<h2 className="text-xl font-bold text-gray-800 truncate">{title}</h2>
					<span className="px-3 py-1 text-sm font-semibold text-gray-700 bg-gray-200 rounded-full">
						Rating: {vote_average} / 10
					</span>
				</div>
				<p className="h-16 overflow-hidden text-sm text-gray-600">{overview}</p>
				<div className="mt-4">
					<button
						onClick={handleViewDetails}
						className="w-full px-4 py-2 font-bold text-white transition-all bg-blue-500 rounded-full hover:bg-blue-700"
					>
						View Details
					</button>
				</div>
			</div>
			{/* Modal for displaying single movie details */}
			<MovieModal modalState={isModalOpen} movie={movieData} closeModal={handleModalState} />
		</div>
	);
};

export default MovieCard;
