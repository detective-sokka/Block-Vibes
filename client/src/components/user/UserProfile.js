import React from "react";
import { useEffect, useState, useContext } from "react";
import { UserContext } from '../../App'
import '../../Css/profile.scss';
import { useParams } from 'react-router-dom'
//import { use } from "../../../../server/routes/post";

const Profile = () => {
    const [UserProfile, setProfile] = useState(null)
    const [showfollow, setShowFollow] = useState(true)
    const { state, dispatch } = useContext(UserContext)
    const { userid } = useParams()
    // console.log(userid)
    useEffect(() => {
        fetch(`/user/${userid}`, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
            .then(result => {
                console.log(result)

                setProfile(result)
                //setPics(result.mypost)
            })
    }, [])


    const followUsers = () => {
        fetch('/follow', {

            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")

            },
            body: JSON.stringify({
                followId: userid
            })

        }).then(res => res.json())
            .then(data => {


                dispatch({ type: "UPDATE", payload: { following: data.following, followers: data.followers } })
                localStorage.setItem("user", JSON.stringify(data))
                setProfile((prevState) => {

                    return {
                        ...prevState,
                        user: {
                            ...prevState.user,
                            followers: [...prevState.user.followers, data._id]
                            //.push()
                        }
                    }
                })
                setShowFollow(false)

            })

    }

    const unfollowUsers = () => {
        fetch('/unfollow', {

            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")

            },
            body: JSON.stringify({
                unfollowId: userid
            })

        }).then(res => res.json())
            .then(data => {


                dispatch({ type: "UPDATE", payload: { following: data.following, followers: data.followers } })
                localStorage.setItem("user", JSON.stringify(data))

                setProfile((prevState) => {
                    const newFollower = prevState.user.followers.filter(item => item != data._id)

                    return {
                        ...prevState,
                        user: {
                            ...prevState.user,
                            followers: newFollower
                            //.push()
                        }
                    }
                })
                setShowFollow(true)

            })

    }

    return (
        <>
            {UserProfile ?
                <div className="profile">
                    <div className="user-profile">
                        <div>
                            <img className="profile-icon"
                                src="https://images.unsplash.com/photo-1520183802803-06f731a2059f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8cGVyc29ufGVufDB8MnwwfHw%3D&auto=format&fit=crop&w=800&q=60"
                            />
                        </div>
                        <div>
                            {/* {console.log(UserProfile.user)} */}
                            <h4>{UserProfile.user.name}</h4>
                            <h5>{UserProfile.user.email}</h5>
                            <div>
                                <h6>{UserProfile.posts.length} posts </h6>                                
                            </div>
                            {showfollow ?
                                <button style={{
                                    margin: "10px"
                                }} className="btn waves-effect waves-light #42a5f5 blue darken-1"
                                    onClick={() => followUsers()}  >
                                    Follow
                                </button>
                                :
                                <button
                                    style={{
                                        margin: "10px"
                                    }}
                                    className="btn waves-effect waves-light #42a5f5 blue darken-1"
                                    onClick={() => unfollowUsers()}  >
                                    UnFollow
                                </button>
                            }


                        </div>
                    </div>
                    <div className="gallery">
                        {
                            UserProfile.posts.map(item => {
                                return (
                                    < img className="item" src={item.photo} alt={item.title} />
                                )
                            })
                        }

                    </div>
                </div>

                : <h2>loading...!</h2>}

        </>
    )
}

export default Profile;