import { useContext } from "react";
import { Router } from "./router/Router";
import { LoadingContext } from "./context/LoadingProvider";
import { LoadingOverLay } from "./components/ui/loading/LoadingOverLay";

function App() {
  // context
  const { isLoadingOverlay } = useContext(LoadingContext);

  console.log(isLoadingOverlay);

  return (
    <>
      {isLoadingOverlay && <LoadingOverLay />}
      <Router />
    </>
  );
}

export default App;
