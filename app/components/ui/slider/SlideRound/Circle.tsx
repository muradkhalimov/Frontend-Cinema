import cn from "classnames";
import { FC } from "react";

import styles from "../slider.module.scss";

import { IActive } from "./SlideCircle";

const Circle: FC<IActive> = ({ isActive }) => {
	return (
		<div
			className={cn(styles.round, {
				[styles.white]: isActive,
				[styles.gray]: !isActive,
			})}
		></div>
	);
};
export default Circle;
