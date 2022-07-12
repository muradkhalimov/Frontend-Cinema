import { FC } from "react";

import styles from "../slider.module.scss";

import Round from "./Circle";

export interface IActive {
	isActive?: boolean;
	numberOfCircles?: number;
	index?: number;
}

const SlideCircle: FC<IActive> = ({ index, numberOfCircles = 3 }) => {
	const arrayOfCircles = [];

	for (let i = 0; i < numberOfCircles; i++) {
		arrayOfCircles.push(<Round key={i} isActive={index === i && true} />);
	}
	return <div className={styles.round}>{arrayOfCircles}</div>;
};
export default SlideCircle;
