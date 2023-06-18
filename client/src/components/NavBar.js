import React, { useEffect } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import "../Css/navbar.scss";
import { Link } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(UserContext);

  useEffect(() => {
    var elems = document.querySelectorAll(".sidenav");
    window.M.Sidenav.init(elems, {});
  }, []);

  const navigateLogin = () => {
    navigate("/login");
  };

  const renderList = () => {
    if (state && state.admin) {
      return [
        <li>
          <button
            className="btn btn-outline-danger"
            onClick={() => {
              localStorage.clear();
              dispatch({ type: "CLEAR" });
              navigate("/login");
            }}
          >
            LogOut
          </button>
        </li>,
      ];
    }
    if (state) {
      return [
        <li className="links">
          <Link to={state ? "/" : "/login"}>Home</Link>
        </li>,
        <li className="links">
          <Link to="/profile">Profile</Link>
        </li>,
        <li className="links">
          <Link to="/create">Create Post</Link>
        </li>,        
        <li>
          <button
            className="btn btn-outline-danger"
            onClick={() => {
              localStorage.clear();
              dispatch({ type: "CLEAR" });
              navigate("/login");
            }}
          >
            LogOut
          </button>
        </li>,
      ];
    } else {
      return [ ];
    }
  };
  return (
    <>
      <nav>
        <div className="nav-wrapper">
          <h3 className="brand-logo left"> Block Vibes </h3>
          <a
            href="#"
            data-target="mobile-demo"
            className="sidenav-trigger sidenav-icon"
          >
            <i className="material-icons">menu</i>
          </a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            {renderList()}
          </ul>
        </div>
      </nav>

      <ul className="sidenav" id="mobile-demo">
        {renderList()}
      </ul>
    </>
  );
};

export default NavBar;
