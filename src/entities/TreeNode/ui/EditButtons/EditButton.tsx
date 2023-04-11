import React, { FC, MouseEvent, ReactNode } from "react";
import styles from "./EditButtons.module.scss";

import { IconButton } from "@mui/material";

interface EditButtonProps {
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  children?: ReactNode;
}

export const EditButton: FC<EditButtonProps> = ({ onClick, children }) => {
  return (
    <li className={styles.listItem}>
      <IconButton onClick={onClick}>{children}</IconButton>
    </li>
  );
};
