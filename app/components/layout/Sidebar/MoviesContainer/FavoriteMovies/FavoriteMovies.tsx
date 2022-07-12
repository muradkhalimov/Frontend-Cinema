import { FC } from "react";

import SkeletonLoader from "@/components/ui/SkeletonLoader";

import { useAuth } from "@/hooks/useAuth";

import { useFavorites } from "../../../../screens/favorites/useFavorites";
import MovieList from "../MovieList";

import NotAuthFavorites from "./NotAuthFavorites";

const FavoriteMovies: FC = () => {
	const { favoriteMovies, isLoading } = useFavorites();
	const { user } = useAuth();

	if (!user) return <NotAuthFavorites />;

	return isLoading ? (
		<div className="mt-11">
			<SkeletonLoader count={3} className="h-28 mb-4" />
		</div>
	) : (
		<MovieList
			link="/favorites"
			movies={favoriteMovies?.slice(0, 3) || []}
			title="Favorites"
		/>
	);
};
export default FavoriteMovies;
