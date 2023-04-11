import React, { FC } from "react";
import styles from "./Footer.module.scss";

import { Typography } from "@mui/material";

const Footer: FC = () => {
  return (
    <footer className={styles.wrapper}>
      <Typography variant={"body2"}>Created by Ihor Kravtsov</Typography>
      <ul>
        <li>
          <a href="" target={"_blank"}>
            Repo
          </a>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
