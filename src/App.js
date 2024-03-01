import "./App.css";
import { useSelector } from "react-redux";

import { Toaster } from "react-hot-toast";
import { Suspense, lazy } from "react";
import Loader from "./components/Loader";

const FormContainer = lazy(() => import("./pages/FormContainer"));
const AppRouter = lazy(() => import("./Router/AppRouter"));
function App() {
  const { IsActive } = useSelector((state) => state.BlogApp);
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      {IsActive ? (
        <Suspense fallback={<Loader />}>
          <AppRouter />
        </Suspense>
      ) : (
        <Suspense fallback={<Loader />}>
          <FormContainer />
        </Suspense>
      )}
    </>
  );
}

export default App;
