import { useContext } from "react";
import { Router } from "./router/Router";
import { LoadingContext } from "./context/LoadingProvider";
import { LoadingOverLay } from "./components/ui/loading/LoadingOverLay";

function App() {
  // context
  const { isLoadingOverlay } = useContext(LoadingContext);

  return (
    <>
      <LoadingOverLay isLoadingOverlay={isLoadingOverlay} />
      <Router />
    </>
  );
}

export default App;
