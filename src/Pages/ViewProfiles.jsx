import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import NavBar from "../Components/NavBar";
import { toast } from "react-toastify";

export const ViewProfiles = () => {

    const { fArray } = useParams()
    const nav = useNavigate()
    console.log(((fArray)));
    const [users, setUsers] = useState(JSON.parse(localStorage.getItem('Users')))

    axios.defaults.withCredentials = true
    const tokenChecker = () => {

        axios.get("https://postazonbackend.onrender.com")
            .then(res => {
                if (!res.data.Token) {
                    localStorage.clear()
                    nav(`/`)
                }
                else setUsers(users.filter((v) => v._id === fArray))
            })
            .catch(er => console.log(er))
    }

    useEffect(() => {
        tokenChecker()
    }, [])

    const clkFollowers = (followersArray) => {
        if (followersArray.length === 0) toast("You have no followers yet")
        else nav(`/viewprofile/${followersArray}`)

    }

    const clkFollowing = (followingArray) => {
        if (followingArray.length === 0) toast("You are not following anyone yet")
        else nav(`/viewprofiles/${followingArray}`)
    }

    return (
        <>
            <NavBar />
            <br />
            <br />
            {users.map((v, i) => (
                <table border={1}>
                    <thead>
                        <tr>
                            <th>SNo</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Followers</th>
                            <th>Following</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td>{i + 1}</td>
                            <td>{v.name}</td>
                            <td>{v.email}</td>
                            <td><button onClick={() => clkFollowers(v.followers)}>{v.followers.length}ℹ️</button></td>
                            <td><button onClick={() => clkFollowing(v.following)}>{v.following.length}ℹ️</button></td>
                        </tr>
                    </tbody>
                </table>
            ))}
        </>
    )
}