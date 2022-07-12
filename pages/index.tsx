import type { GetServerSideProps, GetStaticProps, NextPage } from "next";

import Home from "@/components/screens/home/Home";
import { IHome } from "@/components/screens/home/home.interface";
import { IGalleryItem } from "@/components/ui/gallery/gallery.interface";
import { ISlide } from "@/components/ui/slider/slider.interface";

import { ActorService } from "@/services/actor.service";
import { MovieService } from "@/services/movie.service";

import { getGenresList } from "@/utils/movie/getGenresList";

import { getActorUrl, getMovieUrl } from "@/config/url.config";

const HomePage: NextPage<IHome> = ({ slides, actors, trendingMovies }) => {
	return (
		<Home slides={slides} actors={actors} trendingMovies={trendingMovies} />
	);
};

export const getStaticProps: GetStaticProps = async () => {
	try {
		const { data: movies } = await MovieService.getAll();

		// //multiple random values
		let random = movies.sort(() => 0.5 - Math.random()).slice(0, 3);

		// //const randomMovies = movies[Math.floor(Math.random() * movies.length)] --- only one random value

		//used to be movies instead of random
		const slides: ISlide[] = random.slice(0, 3).map((m) => ({
			_id: m._id,
			link: getMovieUrl(m.slug),
			subtitle: getGenresList(m.genres),
			title: m.title,
			bigPoster: m.bigPoster,
		}));

		const { data: dataActors } = await ActorService.getAll();

		const actors: IGalleryItem[] = dataActors.slice(0, 7).map((a) => ({
			name: a.name,
			posterPath: a.photo,
			link: getActorUrl(a.slug),
			content: {
				title: a.name,
				subtitle: `+${a.countMovies} movies`,
			},
		}));

		const dataTrendingMovies = await MovieService.getMostPopularMovies();

		const trendingMovies: IGalleryItem[] = dataTrendingMovies
			.slice(0, 7)
			.map((m) => ({
				name: m.title,
				posterPath: m.poster,
				link: getMovieUrl(m.slug),
			}));

		return {
			props: {
				slides,
				actors,
				trendingMovies,
			} as IHome,
			revalidate: 60,
		};
	} catch (error) {
		return {
			props: {
				slides: [],
				actors: [],
				trendingMovies: [],
			} as IHome,
		};
	}
};

export default HomePage;
