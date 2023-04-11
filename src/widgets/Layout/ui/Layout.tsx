import React, { FC, ReactNode } from "react";
import styles from "./Layout.module.scss";

import { Footer } from "features/Footer";

interface LayoutProps {
  children?: ReactNode;
}

export const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <main className={styles.content}>{children}</main>
      <Footer />
    </>
  );
};
