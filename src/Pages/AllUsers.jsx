import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import NavBar from "../Components/NavBar"
import { toast } from "react-toastify"
import { Footer } from "../Components/Footer"

const AllUsers = () => {
    const [users, setUsers] = useState([])
    const nav = useNavigate()
    const [path, setPath] = useState("")
    const { likedusers } = useParams()


    axios.defaults.withCredentials = true
    const tokenChecker = () => {

        axios.get("http://localhost:9000/allusers")
            .then(async res => {
                if (!res.data.Token) {
                    localStorage.clear()
                    nav(`/`)
                }
                else {

                    if (likedusers) {
                        const likedUsersArray = []
                        for (let uid of JSON.parse(localStorage.getItem('Likeduserids'))) {
                            likedUsersArray.push(res.data.AllUsers.find((v) => v._id == uid))
                        }
                        setUsers(likedUsersArray)
                    }

                    else {

                        setUsers(res.data.AllUsers.filter((v) => v._id !== localStorage.getItem('Id')))

                        setPath(res.data.AllUsers.find((v) => v._id === localStorage.getItem('Id')).dpfile)
                        localStorage.setItem('Path', path)
                    }
                }
            })
            .catch(er => console.log(er))
    }

    useEffect(() => {
        tokenChecker()
    })

    const clkFollow = (id) => {
        axios.put(`http://localhost:9000/followuser/${id}`)
            .then(res => toast(res.data.msg))
            .catch(er => console.log(er))
    }

    const clkViewPosts = (userposts) => {
        localStorage.setItem('Userposts', JSON.stringify(userposts))
        nav(`/home/${localStorage.getItem('Id')}/${userposts}`)
    }

    return (
        <>
            <div className="all" style={{ background: "grey", height: "100vh", color: "wheat" }}>

                <NavBar Path={localStorage.getItem('Path')} />

                <br />
                <br />
                {
                    likedusers ?
                        <h1 style={{ marginTop: "130px" }}>Likes below:</h1>
                        :
                        <h1 style={{ marginTop: "130px" }}>People You May Know</h1>
                }

                <table border={1} style={{ color: "wheat", background: "black", width: "80vw", marginLeft: "10vw", height: "35vh", marginTop: "100px", textAlign: "center", fontSize: "larger" }}>

                    <thead>
                        <tr>
                            <th>SNo</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th colSpan={2}>Action</th>

                        </tr>
                    </thead>

                    <tbody>

                        {users.map((v, i) => (

                            <tr key={v._id}>
                                <td>{i + 1}</td>
                                <td>{v.name}</td>
                                <td>{v.email}</td>

                                {
                                    (v.followers.includes(localStorage.getItem('Id'))) ?
                                        <>
                                            {
                                                v._id === localStorage.getItem('Id') ?
                                                    <>
                                                        <td><h3>That's You Nigga! 😄🦾</h3></td>
                                                    </>
                                                    :
                                                    <>
                                                        <td> <button onClick={() => clkFollow(v._id)} style={{ background: "darkred", color: "wheat", width: "6vw", fontSize: "small", borderRadius: "10px", height: "4vh" }}>Unfollow</button></td>

                                                        <td><button onClick={() => clkViewPosts(v.posts)} style={{ background: "darkgreen", color: "wheat", width: "6vw", fontSize: "small", borderRadius: "10px", height: "4vh" }}>View Posts</button></td>

                                                    </>
                                            }

                                        </>
                                        :
                                        <>
                                            {
                                                v._id === localStorage.getItem('Id') ?
                                                    <>
                                                        <td><h3>That's You Nigga! 😄🦾</h3></td>
                                                        <td onClick={() => clkViewPosts(v.posts)}>ℹ️ Posts</td>
                                                    </>
                                                    :
                                                    <>
                                                        <td><button onClick={() => clkFollow(v._id)} style={{ background: "darkgreen", color: "wheat", width: "6vw", fontSize: "small", borderRadius: "10px", height: "4vh" }}>Follow</button></td>

                                                        <td>Follow {v.name} to view posts</td>

                                                    </>
                                            }
                                        </>
                                }

                            </tr>

                        ))}

                    </tbody>

                </table>
                <br />
                <br />
                <br />

                <button onClick={() => nav(`/home/${localStorage.getItem('Id')}`)} style={{ background: "darkgreen", color: "wheat", width: "6vw", fontSize: "small", borderRadius: "10px", height: "4vh" }}>Back</button>
            </div>
            <Footer />
        </>
    )


}

export default AllUsers