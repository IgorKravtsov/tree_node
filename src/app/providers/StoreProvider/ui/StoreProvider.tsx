import React, { FC, ReactNode } from "react";
import { Provider } from "react-redux";
import { ReducersMapObject } from "@reduxjs/toolkit";

import { StateSchema } from "../config/StateSchema";
import { createReduxStore } from "../config/store";

interface StoreProviderProps {
  children?: ReactNode;
  initialState?: DeepPartial<StateSchema>;
  asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>;
}

export const StoreProvider: FC<StoreProviderProps> = ({
  asyncReducers,
  children,
  initialState,
}) => {
  const store = createReduxStore(
    initialState as StateSchema,
    asyncReducers as ReducersMapObject<StateSchema>
  );
  return <Provider store={store}>{children}</Provider>;
};