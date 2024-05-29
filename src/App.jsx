import React from "react";
import "./App.css";
import conclusions from "./data";
import Conclusions from "./components/Conclusions";

function App() {
  return (
    <div id="root" className="p-8 text-center">
      <Conclusions conclusions={conclusions} />
    </div>
  );
}

export default App;
