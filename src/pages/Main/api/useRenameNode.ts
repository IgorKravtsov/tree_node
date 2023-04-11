import { useMutation, useQueryClient } from "@tanstack/react-query";

import { $api } from "shared/api/api";

import { queryKeyGetNodes } from "./useGetNodes";
import { RenameNodeDto } from "../model/types/rename-node-dto";

const queryKeyRenameNode = ["rename-node"];

export const useRenameeNode = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: queryKeyRenameNode,
    mutationFn: async (dto: RenameNodeDto) => {
      const { data } = await $api.post("/rename", dto);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeyGetNodes);
    },
  });
};
