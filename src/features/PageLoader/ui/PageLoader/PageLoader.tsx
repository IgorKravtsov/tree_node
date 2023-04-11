import React, { FC } from "react";
import styles from "./Loader.module.scss";

import { Loader } from "shared/ui";

export const PageLoader: FC = () => {
  return (
    <div className={styles.wrapper}>
      <Loader />
    </div>
  );
};
