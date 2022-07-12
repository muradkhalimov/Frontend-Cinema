import React, { ReactNode } from "react";

export interface ISeo {
	title: string;
	description?: string;
	image?: string;
	children?: ReactNode;
}
