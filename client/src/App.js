import React, { useState, useEffect } from 'react';
import {Route, Routes, BrowserRouter, Navigate} from 'react-router-dom'
import Login from './components/Login';
import Header from './components/Header';
import Footer from './components/Footer';
import EmployeeMenu from './components/EmployeeMenu';
import Floormanager from './components/Floormanager';
import './App.css';
import BookingPage from './components/BookingPage';
import Viewbooking from './components/Viewbooking';

function setToken(userToken) {
  sessionStorage.setItem('token', JSON.stringify(userToken));
}

function getToken() {
  const tokenString = sessionStorage.getItem('token');
  return tokenString;
}

function setType(userType){
  let temp = userType.toLowerCase();
  sessionStorage.setItem('designation', JSON.stringify(temp));
}

function getType(){
  const userDesignation = sessionStorage.getItem('designation');
  return userDesignation;
}

function setUser(username){
  sessionStorage.setItem('username', JSON.stringify(username));
}

function setUseId(userid){
  sessionStorage.setItem('userid', JSON.stringify(userid));
}

const App = () => {


  const token = getToken();
  const [desig,setDesig] = useState("");

    useEffect(() =>{
        setDesig(JSON.parse(sessionStorage.getItem('designation')))
    },[])

    useEffect(() => {
      fetch("http://localhost:5000/oldData")
        .then(res => res.json())
    },[])

  // useEffect(() =>{
  //   console.log(typeof desig, desig)
  // },[desig])
  

  if(!token)
  {
    return(
      <div>
        <Login setToken={setToken} setType={setType} setUser={setUser} setUseId={setUseId}/>
        <Footer />
      </div>
    )
  }
  // if(desig.length==="")
  // {
  //   return(
  //     <div>
  //       <h1>Waiting</h1>
  //     </div>
  //   )
  // }
  return(
    <div>
      <Header />
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={desig==="floormanager" ? (<Floormanager/>) : (<EmployeeMenu/>)} />
            <Route exact path="/booking/data=:rid/:mdate/time=:stime/end=:etime/room=:location" element={<BookingPage/>} />
            <Route exact path="/history/data=:uname" element={<Viewbooking />} />
            {/* <Route exact path="/floormanager" element={<Floormanager/>} /> */}
          </Routes>
        </BrowserRouter>
      {/* <Footer /> */}
      {/* <h1>welcome to the App! Hello</h1>
      <Login></Login> */}
    </div>
  )
}

export default App;
