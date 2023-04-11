import React, { FC, useState } from "react";
import styles from "./RenameDialog.module.scss";

import { Button, Grid, TextField } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";

import { useWrapActionApi } from "shared/lib";
import { $api } from "shared/api/api";
import { Loader, Modal } from "shared/ui";

import { queryKeyGetNodes } from "../../api/useGetNodes";
import { RenameNodeDto } from "../../model/types/rename-node-dto";

import { useModalContext } from "../ModalContext/ModalContext";

export const RenameDialog: FC = () => {
  const [newName, setNewName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const {
    deactivateModal,
    isActivatedModal,
    modalData: node,
    resetModalData,
  } = useModalContext();

  const queryClient = useQueryClient();
  const wrapActionApi = useWrapActionApi();

  const handleClose = () => {
    deactivateModal();
    resetModalData?.();
    setNewName("");
  };

  const handleRename = async () =>
    wrapActionApi(
      async (dto: RenameNodeDto) => $api.post("/rename", dto),
      {
        newNodeName: newName,
        nodeId: node?.id ?? 0,
      },
      {
        onSuccess: async () => {
          await queryClient.invalidateQueries(queryKeyGetNodes);
          handleClose();
        },
        onLoadingStart: () => setIsLoading(true),
        onLoadingEnd: () => setIsLoading(false),
      }
    );

  return (
    <Modal
      open={isActivatedModal("main-page-rename")}
      onClose={handleClose}
      modalTitle={"Rename"}
      contentNode={
        <Grid className={styles.content}>
          <TextField
            fullWidth
            aria-label={"New node name"}
            label={"New node name"}
            variant={"outlined"}
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            name={"NewNodeName"}
          />
        </Grid>
      }
      actions={
        <>
          <Button onClick={handleClose} variant={"outlined"}>
            Cancel
          </Button>
          <Button
            onClick={handleRename}
            variant={"contained"}
            disabled={isLoading}
          >
            {isLoading ? <Loader size={25} color={"success"} /> : "Rename"}
          </Button>
        </>
      }
    />
  );
};
