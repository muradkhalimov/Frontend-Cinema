import { FC } from "react";

import Meta from "@/utils/meta/Meta";

import { getMovieUrl } from "@/config/url.config";

import GalleryItem from "../gallery/GalleryItem";
import Description from "../heading/Description";
import Heading from "../heading/Heading";

import { ICatalog } from "./catalog.interface";
import styles from "./catalog.module.scss";

const Catalog: FC<ICatalog> = ({ movies, title, description }) => {
	return (
		<Meta title={title} description={description}>
			<Heading title={title} className={styles.heading} />
			{description && (
				<Description text={description} className={styles.desctiption} />
			)}

			<section className={styles.movies}>
				{movies.length > 0 ? (
					movies.map((movie) => (
						<GalleryItem
							key={movie._id}
							item={{
								name: movie.title,
								link: getMovieUrl(movie.slug),
								posterPath: movie.bigPoster,
								content: {
									title: movie.title,
								},
							}}
							variant="horizontal"
						/>
					))
				) : (
					<div className="text-white text-lg">Nothing yet 🤷‍♂️</div>
				)}
			</section>
		</Meta>
	);
};
export default Catalog;
