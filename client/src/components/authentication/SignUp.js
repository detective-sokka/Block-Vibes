import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import M from "materialize-css";  

const SignUp = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [admin, setUser] = useState(false);
  const [warning, setWarning] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const premium = false;
 
  
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };


  const PostData = () => {
    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      setWarning(true);
      return;
    }

    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        password,
        email,
        admin,
        premium,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.error) {
          setWarning(true);
          
        } else {
          setWarning(false);
          navigate("/login");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (    
      <div className="card mx-auto mt-30 align-self-center">
        <h2 className="text-center px-5">SignUp</h2>                
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />    
        <div align="left">
        <input type="checkbox" id="admin" name="admin" value={admin} 
        onChange={e => {console.log(e.target.checked);
          setUser(e.target.checked)}}/>
        <label for="admin"> Admin</label> 
        </div>    
        <br></br>

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /><br></br>
        <button
          className="btn waves-effect waves-light #3f51b5 indigo"
          onClick={() => PostData()}
        >
          SignUp
        </button><br></br>
        <h6>
          <Link to="/login">Already have an account? </Link>
        </h6>
        { warning &&
          <div class="alert alert-warning" role="alert">
          Invalid details
        </div>
        
        }
      </div>    
  );
};

export default SignUp;
