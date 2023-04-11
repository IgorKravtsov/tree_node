import React, { FC, useState } from "react";

import { Button } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";

import { Loader, Modal, ModalProps } from "shared/ui";
import { useWrapActionApi } from "shared/lib";
import { $api } from "shared/api/api";

import { useModalContext } from "../ModalContext/ModalContext";
import { queryKeyGetNodes } from "../../api/useGetNodes";

interface DeleteDialogProps extends Omit<ModalProps, "open"> {}

export const DeleteDialog: FC<DeleteDialogProps> = () => {
  const [error, setError] = useState(false);
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
    setError(false);
  };

  const handleDelete = async () =>
    wrapActionApi(
      async (nodeId) => $api.post("/delete", { nodeId }),
      node?.id,
      {
        onSuccess: async () => {
          await queryClient.invalidateQueries(queryKeyGetNodes);
          handleClose();
        },
        onError: () => {
          setError(true);
        },
        onLoadingStart: () => setIsLoading(true),
        onLoadingEnd: () => setIsLoading(false),
      }
    );

  return (
    <Modal
      open={isActivatedModal("main-page-delete")}
      onClose={handleClose}
      modalTitle={"Delete"}
      contentText={
        error
          ? "You have to delete all children nodes first"
          : `Do you want to delete ${node?.name}?`
      }
      actions={
        !error ? (
          <>
            <Button onClick={handleClose} variant={"outlined"}>
              Cancel
            </Button>
            <Button onClick={handleDelete} variant={"outlined"} color={"error"}>
              {isLoading ? <Loader size={25} color={"error"} /> : "Delete"}
            </Button>
          </>
        ) : (
          <>
            <Button
              fullWidth
              onClick={handleClose}
              variant={"outlined"}
              disabled={isLoading}
            >
              Cancel
            </Button>
          </>
        )
      }
    />
  );
};
