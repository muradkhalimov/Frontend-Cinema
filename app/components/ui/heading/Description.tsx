import cn from "classnames";
import parse from "html-react-parser";
import { FC } from "react";

const Description: FC<{ text: string; className?: string }> = ({
	text,
	className = "",
}) => {
	return (
		<div
			className={cn("text-lg font-light text-white text-opacity-60", className)}
		>
			<div>{parse(text)}</div>
		</div>
	);
};
export default Description;
