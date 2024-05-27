import { useState } from 'react';
import './App.css';
import conclusions from './data';
import Conclusions from './components/Conclusions';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <h1>{conclusions.conclusion2.answer}</h1>
    <Conclusions></Conclusions>

    </>
  )
}

export default App
