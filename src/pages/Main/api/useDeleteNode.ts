import { useQueryClient } from "@tanstack/react-query";

import { $api } from "shared/api/api";
import { useWrapActionApi } from "shared/lib/hooks/useActionApi";

const queryKeyDeleteNode = ["delete-node"];

export const useDeleteNode = async () => {
  const queryClient = useQueryClient();

  const wrapActionApi = useWrapActionApi();

  return wrapActionApi(async (req) => $api.post("/delete", req), 1);
  //
  // return useMutation({
  //   mutationKey: queryKeyDeleteNode,
  //   mutationFn: async (nodeId: number) => {
  //     try {
  //       const { data } = await $api.post("/delete", {
  //         nodeId,
  //       });
  //       return data;
  //     } catch (e) {
  //       console.log("=======WE ARE IN ERROR=======");
  //       throw e;
  //     }
  //   },
  //   onSuccess: () => {
  //     queryClient.invalidateQueries(queryKeyGetNodes);
  //   },
  // });
};
