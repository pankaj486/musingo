import { UseGetProps, UseGetReturn } from "restful-react/dist/useGet";
import { useState } from "react";

export type Fetcher<
  TData = any,
  TError = any,
  TQueryParams = any,
  TPathParams = any
> = (
  props: Omit<UseGetProps<TData, TError, TQueryParams, TPathParams>, "path">
) => UseGetReturn<TData, TError, TQueryParams>;

export type PaginatedParams = {
  [key: string]: any;
  limit?: number;
  offset?: number;
};

export type PaginatedData<TResult> = {
  results?: TResult[];
  next?: string | null;
  count?: number;
};

export const usePaginatedList = <
  TResult,
  TData extends PaginatedData<TResult>,
  TError = any,
  TPathParams = unknown
>(
  fetcher: Fetcher<TData, TError, PaginatedParams, TPathParams>,
  params: Omit<
    UseGetProps<TData, TError, PaginatedParams, TPathParams>,
    "path"
  >,
  limit?: number,
  lazy?: boolean
) => {
  const [currentOffset, setCurrentOffset] = useState(0);
  const [currentLimit, setCurrentLimit] = useState(limit);
  const [hasNext, setHasNext] = useState<boolean>(false);

  const [completeData, setCompleteData] = useState<TResult[]>([]);

  const { loading, refetch } = fetcher({
    ...params,
    queryParams: {
      ...params.queryParams,
      limit: currentLimit,
      offset: currentOffset,
    },
    resolve: (data: TData) => {
      if (data.results && data.count) {
        setCompleteData(completeData.concat(data.results));

        if (!currentLimit) {
          setCurrentLimit(data.count);
          setCurrentOffset(data.count);
        }

        if (data.next) {
          setHasNext(!!data.next);
        }
      }
      return data;
    },
    lazy,
  });

  const fetchNext = async () => {
    if (currentLimit) {
      setCurrentOffset(currentOffset + currentLimit);
    }
  };

  const reload = async () => {
    setCompleteData([]);
    setCurrentLimit(limit);
    setCurrentOffset(0);
    await refetch();
  };

  return { data: completeData, loading, hasNext, fetchNext, reload };
};
