import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './pages/home'; // Import your Home component
import Login from './pages/login'; // Import your About component
import ResetPassword from './pages/resetpass';
import Register from './pages/register' // Import your Contact component
import { Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom/dist';
import MyDocs from './pages/mydocs';
import AddDoc from './pages/addDoc';
import DownloadDocs from './pages/downloadDocs';
import BookMarkedDocs from './pages/bookMark';


function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Login />} />
          <Route index element={<Login />} />
          <Route path="home" element={<Home />} />
          <Route path="mydocs" element={<MyDocs />} />
          <Route path="add-doc" element={<AddDoc />} />
          <Route path="download-doc" element={<DownloadDocs />} />
          <Route path="bookmark" element={<BookMarkedDocs />} />
          <Route path='register' element={<Register />} />
          <Route path="reset-password" element={<ResetPassword />} />
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;


