import { FC } from "react";

import GalleryItem from "./GalleryItem";
import { IGalleryItem } from "./gallery.interface";
import styles from "./gallery.module.scss";

const Gallery: FC<{ items: IGalleryItem[] }> = ({ items }) => {
	return (
		<div className={styles.gallery}>
			{items.map((item) => (
				<GalleryItem key={item.link} item={item} variant="vertical" />
			))}
		</div>
	);
};
export default Gallery;
