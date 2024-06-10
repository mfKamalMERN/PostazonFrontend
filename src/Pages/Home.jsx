import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify";
import NavBar from "../Components/NavBar";
import { Footer } from "../Components/Footer";
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

export const Home = () => {
    const { id } = useParams()
    const { viewuserpost } = useParams()
    const [posts, setPosts] = useState([])
    const [usercomment, setusercomment] = useState("")
    const [users, setUsers] = useState(JSON.parse(localStorage.getItem('Users')))
    const nav = useNavigate()
    const [liked, setLiked] = useState(JSON.parse(localStorage.getItem('Liked')))
    const [editcomment, setEditcomment] = useState(false)
    const [updatedcomment, setUpdatedcomment] = useState("")
    const [showcomments, setShowcomments] = useState("")
    const [showcmnt, setShowcmnt] = useState(false)
    const [path, setPath] = useState(localStorage.getItem('Path'))


    axios.defaults.withCredentials = true
    const tokenChecker = () => {

        axios.get("https://postazon-mern.onrender.com")
            .then(async res => {
                if (!res.data.Token) {
                    localStorage.clear()
                    nav(`/`)
                }
                else {
                    if (!viewuserpost) setPosts(res.data.AllPosts)

                    else {
                        const pa = []

                        for (let pid of JSON.parse(localStorage.getItem('Userposts'))) {
                            pa.push(res.data.AllPosts.find((v) => v._id == pid))
                        }

                        setPosts(pa)

                    }
                    try {
                        const response = await axios.get(`https://postazon-mern.onrender.com/allusers`)
                        setPath(response.data.AllUsers.find((v) => v._id === localStorage.getItem('Id')).dpfile)
                        setUsers(response.data.AllUsers)
                        localStorage.setItem('Path', path)

                    } catch (error) {
                        console.log(error);
                    }
                }
            })
            .catch(er => console.log(er))
    }

    useEffect(() => {
        tokenChecker()
    })

    const clkLikeUnlike = (postid) => {
        axios.put(`https://postazon-mern.onrender.com/likeandunlike/${postid}`)
            .then(res => {
                if (res.data.msg === "Post Unliked") {
                    toast(res.data.msg)
                    setLiked(false)
                    localStorage.setItem('Liked', JSON.stringify(false))
                }
                else {
                    toast(res.data.msg)
                    setLiked(res.data.Liked)
                    localStorage.setItem('Liked', JSON.stringify(true))
                }
            })
            .catch(err => console.log(err))
    }

    const addComment = async (postid) => {
        if (usercomment.trim() === "") toast("Comment is empty")
        else {
            try {
                const response = await axios.post(`https://postazon-mern.onrender.com/addcomment/${postid}`, { usercomment })
                toast(response.data.msg)
                setusercomment("")

            } catch (error) {
                console.log(error);
            }

        }
    }

    const deleteComment = (idarray) => {
        const postid = idarray[0]
        console.log(typeof (postid));
        const commentid = idarray[1]
        console.log(typeof (commentid));

        axios.put(`https://postazon-mern.onrender.com/deletecomment/${postid}`, { commentid })
            .then(res => toast(res.data))
            .catch(er => console.log(er))

    }

    const editCommentStatus = (idarray) => {
        setEditcomment(true)
    }

    const updateComment = (idarray) => {

        if (updatedcomment.trim() === "") toast("Comment is empty")
        else {
            const postid = idarray[0]
            console.log(typeof (postid));
            const commentId = idarray[1]
            console.log(typeof (commentId));

            axios.put(`https://postazon-mern.onrender.com/editcomment/${postid}`, { commentId, updatedcomment })
                .then(res => {
                    toast(res.data.msg)
                    setEditcomment(false)
                })
                .catch(er => console.log(er))
        }
    }

    const cmntStatus = (cmid) => {
        setShowcomments(cmid)
        setShowcmnt(!showcmnt)
    }

    const clkViewLikes = (likedUserIds) => {
        localStorage.setItem('Likeduserids', JSON.stringify(likedUserIds))
        const likedusers = true
        nav(`/allusers/${likedusers}`)
    }

    return (

        <div className="all" style={{ background: "grey", height: "auto", color: "wheat" }}>
            <NavBar Path={path} />

            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />

            <div className="newpost">
                <button onClick={() => nav(`/createpost/${id}`)} style={{ background: "darkgreen", color: "wheat", borderRadius: "10px", height: "4vh" }}>➕ Have Something in Mind ?</button>
            </div>

            <br />
            <br />

            <div className="postitems" style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }} >

                {
                    posts.map((v) => (

                        <div className="post" style={{ border: "1px solid wheat", width: "auto", borderRadius: "5px", height: "auto", background: "black", marginBottom: "10vh", borderRadius: "15px" }} key={v._id}>

                            {
                                (v.owner === localStorage.getItem('Id')) &&
                                    ((JSON.parse(localStorage.getItem('Users')).find((user) => user._id === v.owner).followers.includes(localStorage.getItem('Id'))))
                                    ?
                                    <>

                                    </>
                                    :
                                    <>
                                        {
                                            (v.owner == localStorage.getItem('Id')) ?
                                                <>
                                                    Your Post
                                                </> :
                                                <>
                                                    Posted By: {users.find((user) => user._id == v.owner).name}
                                                </>
                                        }
                                        <p><b>{v.caption}</b></p>

                                        {
                                            (v.owner === localStorage.getItem('Id')) ?
                                                <>
                                                    <button onClick={() => nav(`/editpostimage/${v._id}`)}>✏️</button>
                                                    <br />
                                                    <img src={v.image.url} alt="" width={650} height={550} style={{ borderRadius: "15px" }} />
                                                </>
                                                :
                                                <>
                                                    <img src={v.image.url} alt="" width={650} height={550} style={{ borderRadius: "15px" }} />
                                                </>
                                        }

                                        <div className="lc">

                                        </div>
                                        {
                                            (!v.likes.includes(id)) ?
                                                <>
                                                    <button onClick={() => clkLikeUnlike(v._id)} style={{ background: "darkgreen", color: "wheat", borderRadius: "10px", height: "4vh" }}>Like ({v.likes.length}👍)
                                                    </button>

                                                </>
                                                :
                                                <button onClick={() => clkLikeUnlike(v._id)} style={{ background: "green", color: "wheat", borderRadius: "10px", height: "4vh" }}>Liked ({v.likes.length}👍)</button>
                                        }

                                        <button onClick={() => clkViewLikes(v.likes)} style={{ background: "darkgreen", color: "wheat", borderRadius: "10px", height: "4vh", marginLeft: "30px" }}>ℹ️ Likes</button>

                                        <button onClick={() => cmntStatus(v._id)} style={{ background: "green", marginLeft: "30px", height: "4vh", color: "wheat", borderRadius: "10px", marginBottom: "10px", marginTop: "10px" }}>ℹ️ Comments</button>

                                        {
                                            (showcomments === v._id) ?
                                                !showcmnt ?
                                                    <></>
                                                    :

                                                    <>
                                                        <div className="comments" style={{ background: "darkred", display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", color: "wheat", fontSize: "small" }}>

                                                            <h4>Comments</h4>

                                                            {v.comments.map((comment) => (

                                                                (comment.user == localStorage.getItem('Id')) ?

                                                                    <div className="bt" style={{ display: "flex", justifyContent: "space-between", width: "40vw" }}>

                                                                        {(!editcomment) ?
                                                                            <>
                                                                                {/* {users.find((user) => user._id == comment.user).name}: {comment.comment} */}
                                                                                <Stack direction="row" spacing={1} style={{ marginTop: "15px", marginBottom: "15px" }}>
                                                                                    <Avatar alt={users.find((user) => user._id == comment.user).name} src={users.find((user) => user._id == comment.user).dpfile} />

                                                                                    <h3>:  {comment.comment}</h3>
                                                                                </Stack>
                                                                                <div className="btns">

                                                                                    <button onClick={() => editCommentStatus()} style={{ background: "darkgreen" }}>✏️</button>
                                                                                    <button onClick={() => deleteComment([v._id, comment._id])} style={{ background: "darkred" }}>🪣</button>
                                                                                </div>
                                                                            </>
                                                                            :
                                                                            <>
                                                                                <Stack direction="row" spacing={1}>
                                                                                    <Avatar alt={users.find((user) => user._id == comment.user).name} src={users.find((user) => user._id == comment.user).dpfile} />
                                                                                </Stack>:

                                                                                <input type="text" value={updatedcomment} onChange={(e) => setUpdatedcomment(e.target.value)} style={{ background: "black", color: "wheat" }} />

                                                                                <div className="btns">

                                                                                    <button onClick={() => updateComment([v._id, comment._id])} style={{ background: "darkgreen", color: "wheat", width: "4vw", borderRadius: "5px", marginRight: "410px" }}>Update</button>

                                                                                </div>
                                                                            </>
                                                                        }

                                                                    </div>

                                                                    :
                                                                    <>

                                                                        <Stack direction="row" spacing={1} style={{ marginTop: "15px", marginBottom: "15px" }}>
                                                                            <Avatar alt={users.find((user) => user._id == comment.user).name} src={users.find((user) => user._id == comment.user).dpfile} />
                                                                            <h3>:  {comment.comment}</h3>

                                                                        </Stack>
                                                                    </>


                                                            ))}

                                                        </div>
                                                    </>

                                                :
                                                <>

                                                </>

                                        }

                                        <br />
                                        
                                        <input type="text" placeholder="Comment here😄..." style={{ width: "31.5vw", background: "brown", color: "wheat", border: "1px solid black", borderRadius: "15px", textAlign: "center", height: "3.5vh", border: "1px solid wheat", fontSize: "large" }} value={usercomment} onChange={(e) => setusercomment(e.target.value)} />

                                        <button onClick={() => addComment(v._id)} style={{ background: "darkblue", height: "3.5vh" }}>➕</button>
                                    </>

                            }


                        </div>
                    ))
                }
                <Footer />
            </div>
        </div>

    )
}