import React, { FC, useCallback, useState } from "react";

import { TreeNode } from "../../model/types/tree-node";

import { OnActions, TreeNodeList } from "../TreeNodeList/TreeNodeList";
import { NodeComponent } from "entities/TreeNode/ui/NodeComponent/NodeComponent";

interface EditableTreeNodeProps {
  node: TreeNode;
  selectedId?: number;
  paddingLevel?: number;
  onClickNode?: (param: number) => void;
  onActions?: OnActions;
}

export const EditableTreeNode: FC<EditableTreeNodeProps> = ({
  node,
  selectedId,
  paddingLevel = 0,
  onClickNode,
  onActions,
}) => {
  const [isOpened, setIsOpened] = useState(false);

  const handleOpen = useCallback(() => {
    if (node.children?.length) {
      setIsOpened((prev) => !prev);
    }
    onClickNode?.(node.id);
  }, [node, onClickNode]);

  const areChildenExists = Boolean(
    node.children?.length && node.children.length > 0
  );

  const selected = selectedId === node.id;

  return (
    <>
      <NodeComponent
        node={node}
        onActions={onActions}
        selected={selected}
        onClick={handleOpen}
        isOpened={isOpened}
      />
      {areChildenExists && isOpened && (
        <TreeNodeList
          treeNodes={node.children}
          paddingLevel={paddingLevel + 1}
          onClickNode={onClickNode}
          selectedId={selectedId}
          onActions={onActions}
        />
      )}
    </>
  );
};

export default EditableTreeNode;
