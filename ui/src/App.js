import { ReactQueryConfigProvider } from "react-query";
import EmployeesComponent from "./Component/EmployeesComponent";

const queryConfig = {
  refetchAllOnWindowFocus: true,
  retry: 0,
  staleTime: 60000,
};

function App() {
  return (
    <ReactQueryConfigProvider config={queryConfig}>
      <EmployeesComponent />
    </ReactQueryConfigProvider>
  );
}

export default App;
