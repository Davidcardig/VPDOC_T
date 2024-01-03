import Accueil from "./Accueil.tsx";
import {Routes, Route} from "react-router-dom";
import './App.css'

function App() {

  return (
    <>
      <div>
          <Routes>
            <Route path="/" element={<Accueil />} />
            <Route path="/about" element={<h1>About</h1>} />
            </Routes>
        </div>
    </>
  )
}

export default App
