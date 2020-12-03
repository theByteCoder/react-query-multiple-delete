import { Key, useEffect } from "react";
import { useMutation, useQueryCache } from "react-query";

const getCSRFToken = () => {
  return document.cookie.split("=")[1];
};

const useDeleteFn = (selectedRows: Key[], url: string, key: string) => {
  const queryCache = useQueryCache();

  const makeDeleteRequest = () => {
    const response: Promise<Response[]> = Promise.all(
      selectedRows.map((rowId) => {
        return fetch(`${url}${rowId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": getCSRFToken(),
          },
        }).then(
          (response) => Promise.resolve(response.json()),
          (error) => Promise.reject(error)
        );
      })
    );
    return response;
  };

  return useMutation(makeDeleteRequest, {
    onSettled: () => {
      console.log("invalidateQueries");
      queryCache.invalidateQueries(key);
    },
  });
};

export default useDeleteFn;
