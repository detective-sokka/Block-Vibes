import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../App";

const AdminHome = () => {
  const { state, dispatch } = useContext(UserContext);
  const [data, setData] = useState([]);

  const deleteUser = (userid) => {
    fetch(`/deleteUser/${userid}`, {
      method: "delete",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        
        const newData = data.filter((item) => {
          console.log(item._id, result._id);
          return item._id !== result._id;
        });
        setData(newData);
      });
  };

  useEffect(() => {
    fetch("/allUsers", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log("all users", result);
        setData(result.posts);
      });
  }, []);

  return (
    <div className="container">
      <h1 className="text-center"> Welcome {state.name} </h1>
      <table>
        <tr>
          <th>Users</th>
          <th>Delete</th>
        </tr>
        <tbody>
          {data.map((user) => {
            if (user.email != state.email)
              return (
                <tr>
                  <td> {user.name} </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => deleteUser(user._id)}
                    >
                      X
                    </button>
                  </td>
                </tr>
              );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AdminHome;
