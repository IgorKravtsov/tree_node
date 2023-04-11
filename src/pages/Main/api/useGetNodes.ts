import { useQuery } from "@tanstack/react-query";
import { TREE_NAME } from "shared/constants/tree-name";
import { $api } from "shared/api/api";
import { TreeNode } from "entities/TreeNode";

export const queryKeyGetNodes = ["get-nodes", TREE_NAME];

export const useGetNodes = () => {
  return useQuery({
    queryKey: queryKeyGetNodes,
    queryFn: async () => {
      const { data } = await $api.post<TreeNode>("/get");
      return data;
    },
  });
};
