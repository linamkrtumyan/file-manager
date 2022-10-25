import React, {useEffect} from 'react';
import './App.css';
import Home from './pages/Home';

import {Routes, Route} from "react-router-dom"
import Folder from './pages/Folder';
import Navbar from './components/Navbar';
import FileContent from './pages/FileContent';

function App() {

  
  
  return (
    <div className="App">
      <Navbar/>
     <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:folderId" element={<Folder />} />
          <Route path="/file/:fileId" element={<FileContent />} />


          {/* <Route path="*" element={<Home to="/" replace />} /> */}
        </Routes>

   {/* <Home/> */}
   
    </div>
  );
}

export default App;
