import { FC } from "react";

import Banner from "@/components/ui/banner/Banner";
import SubHeading from "@/components/ui/heading/SubHeading";

import Meta from "@/utils/meta/Meta";

import { IMoviePage } from "../../../../pages/movie/[slug]";
import Gallery from "../../ui/gallery/Gallery";
import VideoPlayer from "../../ui/video-player/VideoPlayer";

import Content from "./Content/Content";
import RateMovie from "./RateMovie/RateMovie";
import { useUpdateCountOpened } from "./useUpdateCountOpened";

const SingleMovie: FC<IMoviePage> = ({ movie, similarMovies }) => {
	useUpdateCountOpened(movie.slug);

	return (
		<Meta title={movie.title} description={`Watch ${movie.title}`}>
			<Banner
				image={movie.bigPoster}
				Detail={() => <Content movie={movie} />}
			/>

			<VideoPlayer slug={movie.slug} videoSource={movie.videoUrl} />

			<div className="mt-12">
				<SubHeading title="Similar" />
				<Gallery items={similarMovies} />
			</div>

			<RateMovie slug={movie.slug} movieId={movie._id} />
		</Meta>
	);
};
export default SingleMovie;
