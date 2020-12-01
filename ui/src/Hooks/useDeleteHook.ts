import { Key } from "react";
import { useMutation, useQueryCache } from "react-query";

const getCSRFToken = () => {
  return document.cookie.split("=")[1];
};

const useDeleteFn = (
  selectedRows: Key[] | string[],
  url: string,
  key: string
) => {
  const queryCache = useQueryCache();

  const makeDeleteRequest = async () => {
    const promises: Promise<Response>[] | PromiseLike<Response[]> = [];
    selectedRows.forEach((rowId) => {
      promises.push(
        new Promise((resolve, reject) => {
          // for django server
          // fetch(`${url}${rowId}/`, {
          // for json server
          fetch(`${url}?${rowId}/`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              "X-CSRFToken": getCSRFToken(),
            },
          }).then(
            (response) => {
              const result = response.json();
              resolve(result);
            },
            (error) => {
              reject(error);
            }
          );
        })
      );
    });
    return Promise.all(promises);
  };

  return useMutation(makeDeleteRequest, {
    onSettled: () => {
      console.log("invalidateQueries");
      queryCache.invalidateQueries(key);
    },
  });
};

export default useDeleteFn;
