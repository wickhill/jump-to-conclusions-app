import { useState } from "react";
import "./App.css";
import conclusions from "./data";
import Conclusions from "./components/Conclusions";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
    <div id="root" className="p-8 text-center">
      <Conclusions conclusions={conclusions} />
    </div>
    </>
  );
}

export default App;
