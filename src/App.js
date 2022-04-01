import "./App.css";

import { Route, Routes } from "react-router-dom";
import { Home } from "./pages";
import { Info } from "./pages";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Info" element={<Info />} />
      </Routes>
    </div>
  );
}

export default App;
