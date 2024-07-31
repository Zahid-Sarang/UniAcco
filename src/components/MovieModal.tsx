import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { IMoviesData } from "../types";

interface MovieModalProps {
	modalState: boolean;
	closeModal: (state: boolean) => void;
	movie: IMoviesData | null;
}

const MovieModal = ({ movie, modalState, closeModal }: MovieModalProps) => {
	if (!movie) return null;
	console.log(movie);

	return (
		<Dialog open={modalState} onClose={() => closeModal(false)} className="fixed inset-0 z-10 overflow-y-auto">
			<DialogBackdrop className="fixed inset-0 transition-opacity bg-black bg-opacity-50" />

			<div className="flex items-center justify-center min-h-screen p-4 text-center">
				<DialogPanel className="relative w-full max-w-3xl transition-all transform bg-white rounded-lg shadow-lg">
					<div className="absolute top-0 right-0 p-2">
						<button
							type="button"
							className="text-gray-400 hover:text-gray-600 focus:outline-none"
							onClick={() => closeModal(false)}
						>
							<span className="sr-only">Close</span>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="w-6 h-6"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
							</svg>
						</button>
					</div>
					<div className="flex flex-col sm:flex-row">
						<img
							src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
							alt={movie.title}
							className="object-cover w-full rounded-t-lg sm:w-1/2 sm:rounded-none sm:rounded-l-lg"
						/>
						<div className="w-full p-6">
							<DialogTitle as="h2" className="text-3xl font-bold text-gray-900">
								{movie.title}
							</DialogTitle>
							<p className="mt-2 text-sm text-gray-500">{movie.release_date}</p>
							<p className="mt-4 text-sm text-gray-700">{movie.overview}</p>
							<div className="mt-6">
								<p className="text-sm text-gray-700">
									<strong>Budget:</strong> ${movie.budget.toLocaleString()}
								</p>
								<p className="mt-1 text-sm text-gray-700">
									<strong>Revenue:</strong> ${movie.revenue.toLocaleString()}
								</p>
								<p className="mt-1 text-sm text-gray-700">
									<strong>Status:</strong> {movie.status}
								</p>
								<p className="mt-1 text-sm text-gray-700">
									<strong>Tagline:</strong> {movie.tagline}
								</p>
								<a
									href={movie.homepage}
									target="_blank"
									rel="noopener noreferrer"
									className="inline-block mt-4 text-indigo-600 hover:text-indigo-800"
								>
									Official Website
								</a>
							</div>
						</div>
					</div>
				</DialogPanel>
			</div>
		</Dialog>
	);
};

export default MovieModal;
