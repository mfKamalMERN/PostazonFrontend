import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import NavBar from "../Components/NavBar"
import { toast } from "react-toastify"
import { Footer } from "../Components/Footer"

export const ViewProfile = () => {
    const { userid } = useParams()
    const nav = useNavigate()
    const [mydetails, setMydetails] = useState([])
    const [showfollowing, setShowfollowing] = useState(false)
    const [showfollower, setShowfollower] = useState(false)
    const [followingUsers, setFollowingUsers] = useState([])
    const [followerUsers, setFollowerUsers] = useState([])
    const [allUsers, setAlluser] = useState([])
    const [file, setFile] = useState({})
    const [path, setPath] = useState(localStorage.getItem('Path'))


    axios.defaults.withCredentials = true

    const tokenChecker = () => {

        axios.get("https://postazon-mern.onrender.com/allusers")
            .then(res => {

                if (!res.data.Token) {
                    localStorage.clear()
                    nav(`/`)
                }

                else {
                    setAlluser(res.data.AllUsers)
                    setMydetails(res.data.AllUsers.filter((v) => v._id == userid))
                    // console.log(allUsers);
                }

            })
            .catch(er => console.log(er))
    }

    useEffect(() => {
        tokenChecker()
    })

    const viewFollowingUsers = (followingUsersIds) => {

        if (followingUsersIds.length == 0) toast("Not following anyone")
        else {
            setShowfollowing(!showfollowing)

            const a = []
            for (let followingid of followingUsersIds) {
                a.push(allUsers.find((v) => v._id === followingid))
            }
            setFollowingUsers(a)
            console.log((followingUsers));
        }
    }

    const viewFollowerUsers = (followerUsersIds) => {

        if (followerUsersIds.length == 0) toast("No followers yet")
        else {
            setShowfollower(!showfollower)

            const a = []
            for (let followerid of followerUsersIds) {
                a.push(allUsers.find((v) => v._id === followerid))
            }
            setFollowerUsers(a)
            // console.log((followerUsers));
        }
    }

    const clkFollow = (ID) => {
        setShowfollower(!showfollower)
        setShowfollowing(!showfollowing)
        axios.put(`https://postazon-mern.onrender.com/followuser/${ID}`)
            .then(res => {
                axios.get(`https://postazon-mern.onrender.com/allusers`)
                    .then(res2 => {
                        setAlluser(res2.data.AllUsers)
                        // localStorage.setItem('Users', JSON.stringify(res2.data.AllUsers))
                        toast(res.data.msg)
                    })
                    .catch(err => console.log(err))
            })
            .catch(er => console.log(er))
    }

    const handleUpload = (e) => {
        e.preventDefault()

        const formdata = new FormData()
        formdata.append('filedp', file)

        axios.put(`https://postazon-mern.onrender.com/uploaddp/${localStorage.getItem('Id')}`, formdata)
            .then(res => {
                setPath(res.data.Path)
                localStorage.setItem('Path', path)
                console.log(res.data.Path)
            })
            .catch(er => console.log(er))


    }

    const clkViewPosts = (userposts) => {
        localStorage.setItem('Userposts', JSON.stringify(userposts))
        nav(`/home/${userid}/${userposts}`)
    }

    const clkMyposts = async (myid) => {
        try {
            const response = await axios.get(`https://postazon-mern.onrender.com/myposts/${myid}`)
            const myposts = response.data.MyPosts
            localStorage.setItem('Userposts', JSON.stringify(myposts))
            nav(`/home/${myid}/${myposts}`)

        } catch (error) {
            console.log(error);
        }

    }

    return (
        <>
            <div className="all" style={{ background: "grey", height: "150vh", color: "wheat" }}>


                <NavBar Path={path} />

                <br />
                <br />
                <br />
                <br />
                {/* <br /> */}
                <br />
                <br />


                <h1 style={{ marginLeft: "450px" }}>Your Profile Details</h1>
                <div className="imgandtbl" style={{ display: "flex", justifyContent: "space-around", width: "80vw", marginLeft: "10vw", alignItems: "center" }}>

                    <div className="file">
                        <h2>Change DP</h2>
                        <img src={path} alt="" width={150} height={150} style={{ borderRadius: "150px" }} />
                        <br />
                        <br />
                        <form action="" onSubmit={handleUpload}>
                            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
                            <button type="submit" style={{ background: "darkgreen", color: "wheat", width: "5vw", fontSize: "small", borderRadius: "6px", height: "3vh" }}>⏫ DP</button>
                        </form>
                    </div>

                    {/* <br /> */}

                    <table border={1} style={{ color: "wheat", background: "black", width: "50vw", height: "15vh" }}>

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

                            {mydetails.map((v, i) => (

                                <tr key={v._id}>
                                    <td>{i + 1}</td>
                                    <td>{v.name}</td>
                                    <td>{v.email}</td>

                                    <td><button onClick={() => viewFollowerUsers(v.followers)} style={{ background: "darkgreen", color: "wheat", width: "4vw", fontSize: "large", borderRadius: "10px" }}>{v.followers.length}ℹ️</button></td>

                                    <td><button onClick={() => viewFollowingUsers(v.following)} style={{ background: "darkgreen", color: "wheat", width: "4vw", fontSize: "large", borderRadius: "10px" }}>{v.following.length} ℹ️ </button></td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

                <br />
                <hr />
                <div className="mg" style={{ backgroundColor: "darkred", height: "auto", display: "flex", justifyContent: "space-around" }}>
                    {/* <br /> */}

                    <div className="tbls" style={{ display: "flex", justifyContent: "space-evenly", width: "100vw" }}>

                        {
                            (!showfollowing)
                                ?
                                <>

                                </>
                                :
                                <>
                                    <div className="t1">

                                        <h5>Following list below:</h5>

                                        <table border={1} style={{ color: "wheat", background: "black", width: "40vw", height: "11vh" }}>

                                            <thead>
                                                <tr>
                                                    <th>SNo</th>
                                                    <th>Name</th>
                                                    <th>Email</th>
                                                    <th>Followers</th>
                                                    <th>Following</th>
                                                    <th colSpan={2}>Actions</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {followingUsers.map((v, i) => (

                                                    <tr key={v._id}>
                                                        <td>{i + 1}</td>
                                                        <td>{v.name}</td>
                                                        <td>{v.email}</td>
                                                        {
                                                            (v.followers.includes(userid))
                                                                ?
                                                                <>
                                                                    <td>{v.followers.length} </td>

                                                                    <td>{v.following.length}</td>

                                                                    <td><button onClick={() => clkViewPosts(v.posts)} style={{ background: "darkgreen", color: "wheat", width: "6vw", fontSize: "small", borderRadius: "10px" }}>ℹ️ Posts</button></td>

                                                                    <td><button onClick={() => clkFollow(v._id)} style={{ background: "darkred", color: "wheat", width: "6vw", fontSize: "small", borderRadius: "10px" }}>Unfollow</button></td>
                                                                </>
                                                                :
                                                                <>
                                                                    <td><button onClick={() => viewFollowerUsers(v.followers)}>{v.followers.length} ℹ️ </button></td>

                                                                    <td><button onClick={() => viewFollowingUsers(v.following)}>{v.following.length} ℹ️ </button></td>

                                                                    <td><button onClick={() => clkFollow(v._id)}>Follow</button></td>
                                                                </>
                                                        }


                                                    </tr>

                                                ))}
                                            </tbody>

                                        </table>
                                    </div>
                                </>
                        }

                        <br />
                        <br />
                        <br />

                        {
                            (!showfollower)
                                ?
                                <>

                                </>
                                :
                                <>
                                    <div className="t2">


                                        <h3>Your Followers Below</h3>
                                        <table border={1} style={{ color: "wheat", background: "black", width: "40vw", height: "11vh" }}>

                                            <thead>
                                                <tr>
                                                    <th>SNo</th>
                                                    <th>Name</th>
                                                    <th>Email</th>
                                                    <th>Followers</th>
                                                    <th>Following</th>
                                                    <th colSpan={2}>Actions</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {followerUsers.map((v, i) => (

                                                    <tr key={v._id}>
                                                        <td>{i + 1}</td>
                                                        <td>{v.name}</td>
                                                        <td>{v.email}</td>
                                                        {
                                                            (v.followers.includes(userid))
                                                                ?
                                                                <>
                                                                    <td>{v.followers.length}</td>

                                                                    <td>{v.following.length}</td>

                                                                    <td><button onClick={() => nav(`/home/${userid}/${v.posts}`)} style={{ background: "darkblue", color: "wheat", width: "6vw", fontSize: "small", borderRadius: "10px" }}>ℹ️ Posts</button></td>

                                                                    <td><button onClick={() => clkFollow(v._id)} style={{ background: "darkred", color: "wheat", width: "6vw", fontSize: "small", borderRadius: "10px" }}>Unfollow</button></td>
                                                                </>
                                                                :
                                                                <>
                                                                    <td>{v.followers.length}</td>
                                                                    <td>{v.following.length}</td>
                                                                    <td><button onClick={() => clkFollow(v._id)} style={{ background: "darkgreen", color: "wheat", width: "6vw", fontSize: "small", borderRadius: "10px" }}>Follow</button></td>
                                                                </>
                                                        }

                                                    </tr>

                                                ))}
                                            </tbody>

                                        </table>
                                    </div>

                                </>
                        }
                    </div>
                </div>

                <br />
                <hr />
                <br />

                <button onClick={() => nav(`/allusers`)} style={{ background: "darkgreen", color: "wheat", width: "10vw", fontSize: "small", borderRadius: "6px", height: "4vh", marginRight: "15px" }}>People U may Know</button>

                <button onClick={() => nav(`/home/${localStorage.getItem('Id')}`)} style={{ background: "darkred", color: "wheat", width: "5vw", fontSize: "small", borderRadius: "10px", height: "4vh", marginLeft: "15px" }}>Back</button>

                <button onClick={() => clkMyposts(localStorage.getItem('Id'))} style={{ background: "darkgreen", color: "wheat", width: "5vw", fontSize: "small", borderRadius: "10px", height: "4vh", marginLeft: "15px" }}>My Posts</button>

                <br />
                <br />
                <br />
                <br />
                <br />

                {/* <img src={path} alt="" width={150} height={150} style={{ borderRadius: "150px" }} />
                <br />
                <br />
                <form action="" onSubmit={handleUpload}>
                    <input type="file" onChange={(e) => setFile(e.target.files[0])} />
                    <button type="submit" style={{ background: "darkgreen", color: "wheat", width: "5vw", fontSize: "small", borderRadius: "6px", height: "3vh" }}>⏫ DP</button>
                </form> */}
            </div>
            <Footer />

        </>
    )
}