import { useRouter } from "next/router";
import { FC } from "react";

import SkeletonLoader from "@/components/ui/SkeletonLoader";
import Heading from "@/components/ui/heading/Heading";

import { useAuth } from "@/hooks/useAuth";

import Meta from "@/utils/meta/Meta";

import FavoriteItem from "./FavoriteItem";
import styles from "./favorites.module.scss";
import { useFavorites } from "./useFavorites";

const Favorites: FC = () => {
	const router = useRouter();
	const { user } = useAuth();

	const { favoriteMovies, isLoading } = useFavorites();

	!user && router.replace("/auth");

	return (
		<Meta title="Favorites">
			<Heading title={"Favorites"} />
			<section className={styles.favorites}>
				{isLoading ? (
					<SkeletonLoader
						count={3}
						className={styles.skeletonLoader}
						containerClassName={styles.containerLoader}
					/>
				) : (
					favoriteMovies?.map((movie) => (
						<FavoriteItem key={movie._id} movie={movie} />
					))
				)}
			</section>
		</Meta>
	);
};

export default Favorites;
