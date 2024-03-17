import { useState } from 'react'

import Navbar from './components/Navbar';
import Homepage from './components/Homepage';
import "./index.css";
import Footer from './components/Footer';
import MainContent from './components/MainContent'; 


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <Homepage />
      <MainContent />
      <Footer />
    </>
  )
}

export default App
