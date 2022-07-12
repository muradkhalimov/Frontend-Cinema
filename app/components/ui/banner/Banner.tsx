import Image from "next/image";
import React, { FC } from "react";

import styles from "./banner.module.scss";

interface IBanner {
	image: string;
	Detail?: FC | null;
}

const Banner: FC<IBanner> = ({ image, Detail }) => {
	return (
		<div className={styles.banner}>
			<Image
				alt=""
				src={image}
				draggable={false}
				layout="fill"
				className="image-like-bg object-top"
				unoptimized
				priority
			/>
			{Detail && <Detail />}
		</div>
	);
};

export default Banner;
