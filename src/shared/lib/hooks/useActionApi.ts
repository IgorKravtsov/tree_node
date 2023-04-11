interface IWrapApiCallParams<T> {
  onSuccess?: (response?: T) => void;
  onError?: (message: string) => void;
  onFinally?: () => void;
  onLoadingStart?: () => void;
  onLoadingEnd?: () => void;
}

export const useWrapActionApi = () => {
  return async <P, R>(
    apiCall: (req: P) => Promise<R>,
    request: P,
    config?: Partial<IWrapApiCallParams<R>>
  ) => {
    const { onSuccess, onError, onFinally, onLoadingStart, onLoadingEnd } =
      config || {};
    try {
      onLoadingStart?.();
      const response = await apiCall(request);
      onSuccess?.(response);
    } catch (e: any) {
      onError?.(e.message);
    } finally {
      onFinally?.();
      onLoadingEnd?.();
    }
  };
};
