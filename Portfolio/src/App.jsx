import { BrowserRouter } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/Homepage";
import IndexRouter from "./Componets/Routers";

function App() {
  return (
    <BrowserRouter>
      <HomePage />
      <IndexRouter />
    </BrowserRouter>
  );
}

export default App;
