import React from "react";
import { useEffect, createContext, useReducer, useContext } from "react";
import "./App.css";
import "./Css/favourites.scss";
import "./Css/activity.scss";
import "./Css/feed.scss";
import "./Css/guide.scss";
import "./Css/likes.scss";
import "./Css/story.scss";
import "./Css/home.scss";
import NavBar from "./components/NavBar";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import SignIn from "./components/authentication/SignIn";
import SignUp from "./components/authentication/SignUp";
import Profile from "./components/user/Profile";
import Home from "./components/screens/Home";
import AdminHome from "./components/screens/AdminHome";
import CreatePost from "./components/user/CreatePost";
import AboutUs from "./components/screens/About";
import UserProfile from "./components/user/UserProfile";
import { reducer, initialState } from "./reducers/userReducer.js";
import SubscribedUserPosts from "./components/user/SubscribesUserPosts";
import 'bootstrap/dist/css/bootstrap.css';


export const UserContext = createContext();

const Routing = () => {

  const navigate = useNavigate();

  const { state, dispatch } = useContext(UserContext);

  useEffect(() => {

    const user = JSON.parse(localStorage.getItem("user"));
    
    if (user) {

      dispatch({ type: "USER", payload: user });      

    } else {
      
      navigate("/login");
    }
  }, []);
  
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />      
      <Route path="/about" element={<AboutUs />} />
      <Route path="/login" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route exact path="/profile" element={<Profile />} />
      <Route path="/create" element={<CreatePost belongsTo={"Global"} />} />
      <Route path="/profile/:userid" element={<UserProfile />} />
      <Route path="/myfollowingpost" element={<SubscribedUserPosts />} />
      <Route path="/adminhome" element={<AdminHome />} />
    </Routes>
  );
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <NavBar />
        <Routing />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
