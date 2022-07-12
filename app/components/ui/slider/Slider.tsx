import { FC, useEffect } from "react";
import { useQuery } from "react-query";
import { CSSTransition } from "react-transition-group";

import { MovieService } from "@/services/movie.service";

import { getGenresList } from "@/utils/movie/getGenresList";

import { getMovieUrl } from "@/config/url.config";

import SlideArrow from "./SlideArrow/SlideArrow";
import SlideItem from "./SlideItem";
import SlideCircle from "./SlideRound/SlideCircle";
import { ISlide } from "./slider.interface";
import styles from "./slider.module.scss";
import { useSlider } from "./useSlider";

export interface ISlider {
	slides: ISlide[];
	buttonTitle?: string;
}

const Slider: FC<ISlider> = ({ slides, buttonTitle }) => {
	const { slideIn, index, isNext, isPrev, handleClick } = useSlider(
		slides.length
	);

	return (
		<div className={styles.slider}>
			{<SlideArrow variant="left" clickHandler={() => handleClick("prev")} />}
			<CSSTransition
				in={slideIn}
				timeout={300}
				classNames="slide-animation"
				unmountOnExit
			>
				<SlideItem slide={slides[index]} buttonTitle={buttonTitle} />
			</CSSTransition>

			<div className={styles.round}>
				<SlideCircle index={index} numberOfCircles={slides.length} />
			</div>

			{<SlideArrow variant="right" clickHandler={() => handleClick("next")} />}
		</div>
	);
};
export default Slider;
