import { useMutation, useQueryClient } from "@tanstack/react-query";

import { $api } from "shared/api/api";
import { TREE_NAME } from "shared/constants/tree-name";

import { CreateNodeDto } from "../model/types/create-node-dto";

import { queryKeyGetNodes } from "./useGetNodes";

export const useAddChildren = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["add-children"],
    mutationFn: async (dto: CreateNodeDto) => {
      const { data } = await $api.post("/create", {
        ...dto,
        treeName: TREE_NAME,
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeyGetNodes);
    },
  });
};
