import { ReactNode } from "react";
import styles from "./ImagesGrid.module.scss";

export type ImagesGridProps = {
  children?: ReactNode;
};

const ImagesGrid = (props: ImagesGridProps) => (
  <div className={styles.grid}>{props.children}</div>
);

export default ImagesGrid;
