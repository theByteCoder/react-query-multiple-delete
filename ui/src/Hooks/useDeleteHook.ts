import { useMutation } from "react-query";

const getCSRFToken = () => {
  return document.cookie.split("=")[1];
};

const useDeleteFn = (
  selectedRows: string[],
  url: string,
  key: string,
  queryCache: {
    invalidateQueries: (arg0: string) => void;
    getQueryData: (arg0: string) => any;
    setQueryData: (arg0: string, arg1: any) => any;
    removeQueries: (arg0: any[]) => void;
    refetchQueries: (arg0: string) => void;
  }
) => {
  return useMutation(
    async () => {
      const promises: any[] | PromiseLike<any[]> = [];
      selectedRows.forEach((rowId) => {
        promises.push(
          new Promise((resolve, reject) => {
            fetch(`${url}${rowId}/`, {
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
    },

    {
      onSettled: () => {
        console.log("invalidateQueries");
        queryCache.invalidateQueries(key);
      },
    }
  );
};

export default useDeleteFn;
