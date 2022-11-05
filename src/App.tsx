import React, { useEffect } from "react";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import Folder from "./pages/FolderPage";
import Navbar from "./components/Navbar";
import FileContent from "./pages/FileContent";
import RecycleBin from "./pages/RecycleBin";
import "./App.css";
import Breadcrumbs from "./components/Breadcrumbs";


function App() {
  return (
    <div className="App">
      <Navbar />
     
      <Routes>
      
        <Route path="/" element={<Home />} />
        <Route path="/:folderId" element={<Folder />} />
        <Route path="/file/:fileId" element={<FileContent />} />
        <Route path="/recycle" element={<RecycleBin />} />

        {/* <Route path="*" element={<Home to="/" replace />} /> */}
      </Routes>
    </div>
  );
}

export default App;
