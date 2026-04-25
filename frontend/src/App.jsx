import react from "react";
import Home from "./Pages/Home";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Dash from "./Pages/Dash";
import View from "./Pages/View";
import Adviewenq from "./Admin/Adviewenq";
import Enq from "./Pages/Enq";
import Adlayout from "./Admin/Adlayout";
import Addash from "./Admin/Addash";
import Center from "./Admin/Center";
import Visitor from "./Admin/Visitor";
import Aduser from "./Admin/Aduser";
import Mandashlayout from "./Manager/Mandashlayout";
import Mandash from "./Manager/Mandash";
import Addenq from "./Admin/Addenq";
import Cdash from "./Counselor/Cdash";
import Clayout from "./Counselor/Clayout";
import Coviewenq from "./Counselor/Coviewenq";
import { ToastContainer } from "react-toastify";
import Mviewenq from "./Manager/Mviewenq";
import Profile from "./Counselor/Profile";
import ForgotPassword from "./Pages/ForgotPassword";

function App() {
  return (
    <>
      <div className="container-fluid">
        <ToastContainer />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/log" element={<Login />} />
            <Route path="/forgot" element={<ForgotPassword />} />

            <Route path="/dash/" element={<Adlayout />}>
              <Route path="" element={<Addash />} />
              <Route path="viewenq" element={<Adviewenq />} />
              <Route path="center" element={<Center />} />
              <Route path="visitor" element={<Visitor />} />
              <Route path="user" element={<Aduser />} />
              <Route path="addenq" element={<Addenq />} />
            </Route>
            <Route path="/manager/" element={<Mandashlayout />}>
              <Route path="" element={<Mandash />} />
              <Route path="visitor" element={<Visitor />} />
              <Route path="viewenq" element={<Mviewenq />} />
              <Route path="addenq" element={<Addenq />} />
            </Route>

            <Route path="/counselor" element={<Clayout />}>
              <Route path="" element={<Cdash />} />
              <Route path="visitor" element={<Visitor />} />
              <Route path="viewenq" element={<Coviewenq />} />
              <Route path="addenq" element={<Addenq />} />
              <Route path="profile" element={<Profile />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
