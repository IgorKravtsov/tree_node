import React, { FC, useState } from "react";
import styles from "./AddDialog.module.scss";

import { Button, Grid, TextField } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";

import { Loader, Modal } from "shared/ui";
import { $api } from "shared/api/api";
import { useWrapActionApi } from "shared/lib";

import { queryKeyGetNodes } from "../../api/useGetNodes";
import { CreateNodeDto } from "../../model/types/create-node-dto";

import { useModalContext } from "../ModalContext/ModalContext";

export const AddDialog: FC = () => {
  const {
    deactivateModal,
    isActivatedModal,
    modalData: parentNode,
    resetModalData,
  } = useModalContext();

  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const queryClient = useQueryClient();
  const wrapActionApi = useWrapActionApi();

  const handleClose = () => {
    deactivateModal();
    resetModalData?.();
    setName("");
  };

  const handleAdd = async () =>
    wrapActionApi(
      async (dto: CreateNodeDto) => $api.post("/create", dto),
      {
        nodeName: name,
        parentNodeId: parentNode?.id ?? 0,
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
      open={isActivatedModal("main-page-add")}
      onClose={handleClose}
      modalTitle={"Add"}
      contentNode={
        <Grid className={styles.content}>
          <TextField
            fullWidth
            aria-label={"Node name"}
            label={"Node name"}
            variant={"outlined"}
            value={name}
            onChange={(e) => setName(e.target.value)}
            name={"nodeName"}
          />
        </Grid>
      }
      actions={
        <>
          <Button onClick={handleClose} variant={"outlined"}>
            Cancel
          </Button>
          <Button
            onClick={handleAdd}
            variant={"contained"}
            disabled={isLoading}
          >
            {isLoading ? <Loader size={25} color={"success"} /> : "Add"}
          </Button>
        </>
      }
    />
  );
};
