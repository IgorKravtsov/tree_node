import React, { createContext, FC, ReactNode, useContext } from "react";
import { useActivateModal } from "shared/lib";
import { TreeNode } from "entities/TreeNode";

import { MainPageModal } from "../../model/types/main-page-modals";

type ModalContextType = ReturnType<
  typeof useActivateModal<MainPageModal, TreeNode>
>;

const MainPageContext = createContext<ModalContextType>({
  activateModal: () => null,
  modalData: null,
  saveModalData: () => null,
  isActivatedModal: () => false,
  resetModalData: () => null,
  deactivateModal: () => null,
});

interface ModalContextProps {
  children: ReactNode;
  context: ModalContextType;
}

export const ModalContextProvider: FC<ModalContextProps> = ({
  context,
  children,
}) => {
  return (
    <MainPageContext.Provider value={context}>
      {children}
    </MainPageContext.Provider>
  );
};

export const useModalContext = () => useContext(MainPageContext);
