import "./App.css";
import { useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import FormContainer from "./pages/FormContainer";
import AppRouter from "./Router/AppRouter";
function App() {
  const { IsActive } = useSelector((state) => state.BlogApp);
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      {IsActive ? <AppRouter /> : <FormContainer />}
    </>
  );
}

export default App;
