import React, { FC } from "react";
import { Box, CircularProgress, CircularProgressProps } from "@mui/material";

interface LoaderProps extends CircularProgressProps {}

export const Loader: FC<LoaderProps> = (props) => {
  return (
    <Box data-testid={"loader"} sx={{ display: "flex" }}>
      <CircularProgress {...props} />
    </Box>
  );
};
