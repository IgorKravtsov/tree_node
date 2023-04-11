import React, { FC, MouseEvent } from "react";
import styles from "./EditButtons.module.scss";

import ControlPointIcon from "@mui/icons-material/ControlPoint";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import { EditButton } from "./EditButton";

interface EditButtonsProps {
  onAdd?: () => void;
  onRename?: () => void;
  onDelete?: () => void;
  showRenameDelete?: boolean;
}

export const EditButtonList: FC<EditButtonsProps> = ({
  onDelete,
  onAdd,
  onRename,
  showRenameDelete,
}) => {
  const handleClick = (e: MouseEvent<HTMLButtonElement>, cb?: () => void) => {
    e.stopPropagation();
    cb?.();
  };

  return (
    <ul className={styles.wrapper}>
      <EditButton onClick={(e) => handleClick(e, onAdd)}>
        <ControlPointIcon color={"primary"} />
      </EditButton>
      {showRenameDelete && (
        <>
          <EditButton onClick={(e) => handleClick(e, onRename)}>
            <EditIcon color={"primary"} />
          </EditButton>
          <EditButton onClick={(e) => handleClick(e, onDelete)}>
            <DeleteForeverIcon color={"error"} />
          </EditButton>
        </>
      )}
    </ul>
  );
};

export default EditButtonList;
