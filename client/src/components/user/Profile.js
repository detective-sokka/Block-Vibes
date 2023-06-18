import React from "react";
import { useEffect,useState ,useContext} from "react";
import {UserContext} from '../../App'
import '../../Css/profile.scss';

const Profile = () =>{
    const [mypics,setPics]=useState([])
    const {state,dispatch}=useContext(UserContext)
    useEffect(()=>{
        fetch('/mypost',{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
           console.log(result)
            setPics(result.mypost)
        })
    },[])

    var displayStyle = {

        display : state.premium?"inline-block":"none"
    }

    return(
        <div className="profile">
            <div className="user-profile">
                <div>
                    <img className="profile-icon"
                    src={require("../../../src/egg.png")}
                     />
                </div>
                <div>
                    <h4>{state?state.name:"loading"}<i className="material-icons" style={displayStyle} >check</i></h4>
                    <h5>{state?state.email:"loading"}</h5>
                    <div className="content-section">
                        <h6>{mypics.length} posts</h6>                      
                    </div>
                </div>
            </div>
            <div className="gallery">
                {
                    mypics.map(item=>{
                        return(
                            < img className="item" src={item.photo} alt={item.title}/>
                        )
                    })
                }
           
                 </div>
        </div>
    )
}

export default Profile;