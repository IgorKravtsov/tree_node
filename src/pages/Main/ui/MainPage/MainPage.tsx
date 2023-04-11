import React, { FC, useCallback, useState } from "react";

import { useActivateModal } from "shared/lib";

import { TreeNode, TreeNodeList } from "entities/TreeNode";

import { MainPageModal } from "../../model/types/main-page-modals";
import { useGetNodes } from "../../api/useGetNodes";

import { AddDialog } from "../AddDialog/AddDialog";
import { RenameDialog } from "../RenameDialog/RenameDialog";
import { DeleteDialog } from "../DeleteDialog/DeleteDialog";
import { ModalContextProvider } from "../ModalContext/ModalContext";
import { PageLoader } from "features/PageLoader";
import { NodeComponent } from "entities/TreeNode/ui/NodeComponent/NodeComponent";
import { Typography } from "@mui/material";

const MainPage: FC = () => {
  const { data: tree, isLoading, isError } = useGetNodes();
  const [selectedId, setSelectedId] = useState(-1);
  const [isTreeOpened, setIsTreeOpened] = useState(false);

  const { activateModal, saveModalData, ...context } = useActivateModal<
    MainPageModal,
    TreeNode
  >();

  const handleDelete = useCallback(
    (node: TreeNode) => {
      activateModal("main-page-delete");
      saveModalData(node);
    },
    [activateModal, saveModalData]
  );

  const handleAdd = useCallback(
    (node: TreeNode) => {
      activateModal("main-page-add");
      saveModalData(node);
    },
    [activateModal, saveModalData]
  );

  const handleRename = useCallback(
    (parentNode: TreeNode) => {
      activateModal("main-page-rename");
      saveModalData(parentNode);
    },
    [activateModal, saveModalData]
  );

  const handleClickTree = useCallback(() => {
    setIsTreeOpened((prev) => !prev);
    setSelectedId(tree?.id ?? -1);
  }, []);

  if (isError) {
    return <h1>Something went wrong</h1>;
  }

  if (isLoading || !tree) {
    return <PageLoader />;
  }

  return (
    <>
      <Typography variant={"h2"}>Tree node list</Typography>
      <ModalContextProvider
        context={{ activateModal, saveModalData, ...context }}
      >
        <NodeComponent
          node={tree}
          selected={selectedId === tree.id}
          isOpened={isTreeOpened}
          onActions={{
            onAdd: handleAdd,
          }}
          onClick={handleClickTree}
        />
        {isTreeOpened && (
          <TreeNodeList
            treeNodes={tree?.children ?? []}
            onClickNode={setSelectedId}
            selectedId={selectedId}
            onActions={{
              onDelete: handleDelete,
              onAdd: handleAdd,
              onRename: handleRename,
            }}
          />
        )}
        <AddDialog />
        <RenameDialog />
        <DeleteDialog />
      </ModalContextProvider>
    </>
  );
};

export default MainPage;
