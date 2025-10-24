import React from 'react'
import Header from './components/Header'
import Home from './pages/Home'
import { Routes,Route } from 'react-router-dom'
function App() {
  return (
<>
<Header />
<Routes>
<Route path="/" element={<Home/>}/>
</Routes>
</>
  )
}

export default App