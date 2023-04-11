import React, { FC, ReactNode } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogProps,
  DialogTitle,
} from "@mui/material";

import { Portal } from "../Portal/Portal";

export interface ModalProps extends DialogProps {
  modalTitle?: string;
  contentText?: string;
  actions?: ReactNode;
  contentNode?: ReactNode;
}

export const Modal: FC<ModalProps> = ({
  contentText,
  modalTitle,
  actions,
  fullWidth = true,
  contentNode,
  ...props
}) => {
  return (
    <Portal>
      <Dialog {...props} fullWidth={fullWidth}>
        {modalTitle && <DialogTitle>{modalTitle}</DialogTitle>}
        <DialogContent dividers>
          {contentText && <DialogContentText>{contentText}</DialogContentText>}
          {contentNode}
        </DialogContent>
        {actions && <DialogActions>{actions}</DialogActions>}
      </Dialog>
    </Portal>
  );
};
