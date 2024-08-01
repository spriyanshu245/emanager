import { Routes, Route } from "react-router-dom"
import { Header } from "./Components/Header"
import './App.css'
import { Dashboard } from './Pages/Dashboard';
import { Details } from './Pages/Details';

function App() {
  return (
    <>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/details/:id" element={<Details/>} />
        </Routes>
      </div>
    </>
  )
}

export default App
