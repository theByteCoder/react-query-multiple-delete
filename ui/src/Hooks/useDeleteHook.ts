import { useMutation } from "react-query";

const BASE_URI = "http://localhost:8000/employees";

const getCSRFToken = () => {
  return document.cookie.split("=")[1];
};

const useDeleteFn = (
  selectedRows: string[],
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
      Promise.all([
        selectedRows.forEach(async (rowId) => {
          await fetch(`${BASE_URI}/api/delete/emp_no=${rowId}/`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              "X-CSRFToken": getCSRFToken(),
            },
          });
        }),
      ])
        .then((res) => {
          // show success toast
          return true;
        })
        .catch((err) => {
          // show failure toast
          return false;
        });
    },

    {
      onMutate: () => {
        const previousValue = queryCache.getQueryData("/api/getEmployees/");
        const updatedValue = [...previousValue];
        const removeDeleted = updatedValue.filter((eachValue) => {
          return !selectedRows.includes(eachValue.emp_no.toString());
        });
        queryCache.setQueryData("/api/getEmployees/", removeDeleted);
        return () =>
          queryCache.setQueryData("/api/getEmployees/", previousValue);
      },
      onError: (error) => {},
      onSettled: (data, error) => {
        const previousValue = queryCache.getQueryData("/api/getEmployees/");
        const updatedValue = [...previousValue];
        const removeDeleted = updatedValue.filter((eachValue) => {
          return !selectedRows.includes(eachValue.emp_no.toString());
        });
        queryCache.removeQueries(["/api/getEmployees/", removeDeleted]);
        queryCache.setQueryData("/api/getEmployees/", previousValue);
        queryCache.refetchQueries("/api/getEmployees/");
      },
    }
  );
};

export default useDeleteFn;
