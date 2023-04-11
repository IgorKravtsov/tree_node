import React, { FC, useCallback } from "react";
import styles from "./NodeComponent.module.scss";

import cn from "classnames";
import { IconButton, Typography } from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

import { TreeNode } from "../../model/types/tree-node";

import { OnActions } from "../TreeNodeList/TreeNodeList";
import { EditButtonList } from "../EditButtons/EditButtonList";

interface NodeComponentProps {
  node: TreeNode;
  selected: boolean;
  onActions?: OnActions;
  onClick?: () => void;
  isOpened: boolean;
}

export const NodeComponent: FC<NodeComponentProps> = ({
  node,
  onClick,
  isOpened,
  selected,
  onActions,
}) => {
  const { onAdd, onRename, onDelete } = onActions || {};

  const areChildenExists = Boolean(
    node.children?.length && node.children.length > 0
  );

  const handleDelete = useCallback(() => onDelete?.(node), [node]);
  const handleAdd = useCallback(() => onAdd?.(node), [node]);
  const handleRename = useCallback(() => onRename?.(node), [node]);

  const showRenameDelete = Boolean(onDelete && onRename);

  return (
    <div
      onClick={onClick}
      className={cn(styles.wrapper, {
        [styles.pointer]: areChildenExists,
        [styles.selected]: selected,
      })}
    >
      {areChildenExists && (
        <IconButton
          className={cn(styles.arrow, {
            [styles.rotated]: isOpened,
          })}
        >
          <KeyboardArrowRightIcon />
        </IconButton>
      )}
      <Typography variant={"body1"}>{node.name}</Typography>
      {selected && (
        <EditButtonList
          onDelete={handleDelete}
          onRename={handleRename}
          onAdd={handleAdd}
          showRenameDelete={showRenameDelete}
        />
      )}
    </div>
  );
};
