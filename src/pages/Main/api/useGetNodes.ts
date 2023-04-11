import { useQuery } from "@tanstack/react-query";
import { $api } from "shared/api/api";

import { TreeNode } from "entities/TreeNode";

export const queryKeyGetNodes = ["get-nodes"];

export const useGetNodes = () => {
  return useQuery({
    queryKey: queryKeyGetNodes,
    queryFn: async () => {
      const { data } = await $api.post<TreeNode>("/get");
      return data;
    },
  });
};
