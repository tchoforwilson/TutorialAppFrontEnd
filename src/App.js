import React, { useState, useEffect, Fragment } from "react";
import { Navigate, Routes, Route } from "react-router-dom";
import SignIn from "./components/signin";
import SignUp from "./components/signup";
import UserHome from "./components/user/home";
import Profile from "./components/profile";
import ChangePassword from "./components/user/changePassword";
import AddTutorial from "./components/addTutorial";
import Tutorial from "./components/tutorial";
import Users from "./components/user/users";
import Logout from "./components/logout";
import NavBar from "./components/common/navbar";
import { getMe } from "./services/userService";
import "./App.css";

const App = () => {
  const [user, setUser] = useState(null);
  const getUserData = async () => {
    const { data } = await getMe();
    setUser(data.data.data);
  };
  useEffect(() => {
    getUserData();
  }, []);
  return !user ? (
    <Routes>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/" element={<SignIn />} />
    </Routes>
  ) : (
    <Fragment>
      <NavBar user={user} />
      <main className="container mt-3">
        <Routes>
          <Route path="/dashboard" element={<UserHome user={user} />} />
          <Route path="/me" element={<Profile />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/logout" element={<Logout />} />
          {user.role === "admin" && (
            <Fragment>
              <Route path="/tutorial/:id" element={<Tutorial />} />
              <Route path="/new" element={<AddTutorial />} />
              <Route path="/users" element={<Users />} />
            </Fragment>
          )}
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </main>
    </Fragment>
  );
};

export default App;
