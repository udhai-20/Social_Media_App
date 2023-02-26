import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import MainRouter from "./Router/MainRouter";

function App() {
  return (
    <div>
      <MainRouter />
    </div>
  );
}

export default App;
