import React, { FC } from "react";

import { TreeNode } from "../../model/types/tree-node";

import EditableTreeNode from "../EditableTreeNode/EditableTreeNode";

export interface OnActions {
  onAdd?: (node: TreeNode) => void;
  onDelete?: (node: TreeNode) => void;
  onRename?: (node: TreeNode) => void;
}

interface TreeNodeListProps {
  treeNodes?: TreeNode[];
  paddingLevel?: number;
  selectedId?: number;
  onClickNode?: (param: number) => void;
  onActions?: OnActions;
}

export const TreeNodeList: FC<TreeNodeListProps> = ({
  treeNodes,
  paddingLevel = 0,
  selectedId,
  onClickNode,
  onActions,
}) => {
  return (
    <ul style={{ paddingLeft: `${paddingLevel * 10}px` }}>
      {treeNodes?.map((node) => (
        <li key={node.id}>
          <EditableTreeNode
            node={node}
            paddingLevel={paddingLevel}
            onClickNode={onClickNode}
            selectedId={selectedId}
            onActions={onActions}
          />
        </li>
      ))}
    </ul>
  );
};
