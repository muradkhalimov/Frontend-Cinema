import { FC, PropsWithChildren, ReactNode } from "react";

import styles from "./Layout.module.scss";
import Navigation from "./Navigation/Navigation";
import Sidebar from "./Sidebar/Sidebar";

type Props = {
	children?: ReactNode;
};

const Layout: FC<PropsWithChildren<Props>> = ({ children }: Props) => {
	return (
		<div className={styles.layout}>
			<Navigation />
			<div className={styles.center}>{children}</div>
			<Sidebar />
		</div>
	);
};

export default Layout;
