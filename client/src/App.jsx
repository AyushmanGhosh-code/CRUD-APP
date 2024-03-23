import {Route, Routes } from "react-router-dom";
import Edit from "./components/Edit";
import Home from "./components/Home";
import Create from "./components/Create";

function App() {
 

  return (
    <div className='min-h-screen bg-[#1c2841]'>
     
            
            <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='/create' element={<Create/>}/>
              <Route path="/update/:id" element={<Edit/>}></Route>
            </Routes>
    </div>
  )
}

export default App
