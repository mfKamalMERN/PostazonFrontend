import axios from "axios"
import { useEffect, useState } from "react"

import { useNavigate, useParams } from "react-router-dom"
import NavBar from "../Components/NavBar"
import { toast } from "react-toastify"
import { Footer } from "../Components/Footer"

export const CreatePost = () => {
    const { userid } = useParams()
    const [public_id, setPublic_id] = useState("")
    const [postcaption, setPostcaption] = useState("")
    const nav = useNavigate()
    const [file, setFile] = useState({})
    const [path, setPath] = useState("")

    axios.defaults.withCredentials = true
    const tokenChecker = () => {

        axios.get("https://postazon-mern.onrender.com")
            .then(res => {
                if (!res.data.Token) {
                    localStorage.clear()
                    nav(`/`)
                }
                else {
                    setPath((JSON.parse(localStorage.getItem('Users').find((v) => v._id === localStorage.getItem('Id')))).dpfile)
                    localStorage.setItem('Path', path)
                }

            })
            .catch(er => console.log(er))
    }

    useEffect(() => {
        tokenChecker()
    })

    const handleSubmit = (e) => {
        e.preventDefault()

        if (public_id.trim() === "") toast("Public id is a mandatory field")

        else {

            const formdata = new FormData()
            formdata.append('newfile', file)
            formdata.append('ownerid', userid)
            formdata.append('postcaption', postcaption)
            formdata.append('public_id', public_id)

            axios.post("https://postazon-mern.onrender.com/createpost", formdata)
                .then(res => {
                    toast(res.data.msg)
                    nav(`/home/${userid}`)
                })
                .catch(er => console.log(er))
        }
    }

    return (
        <>
            <div className="all" style={{ background: "grey", height: "100vh", color: "wheat" }}>

                <NavBar Path={localStorage.getItem('Path')} />

                <br />
                <br />

                <h2 style={{ marginTop: "150px" }}>Hey {JSON.parse(localStorage.getItem('Users')).find((v) => v._id == userid).name} ! Go ahead and create your new post 👍🏮🛩️</h2>

                <form action="" onSubmit={handleSubmit} style={{ marginTop: "80px" }}>
                    <label htmlFor="pbid" style={{ fontSize: "x-Large", fontFamily: "cursive" }}>Public Id</label>
                    <br />
                    <input type="pbid" value={public_id} onChange={(e) => setPublic_id(e.target.value)} style={{ background: "black", color: "wheat", textAlign: "center", width: "40vw", height: "4vh", borderRadius: "20px", fontSize: "large" }} />
                    <br />
                    <br />
                    <label htmlFor="caption" style={{ fontSize: "x-Large", fontFamily: "cursive" }}>Caption</label>
                    <br />
                    <input type="caption" value={postcaption} onChange={(e) => setPostcaption(e.target.value)} style={{ background: "black", color: "wheat", textAlign: "center", width: "40vw", height: "4vh", borderRadius: "20px", fontSize: "large" }} placeholder="Caption..." />
                    <br />
                    <br />
                    <input type="file" onChange={(e) => setFile(e.target.files[0])} />
                    <br />
                    <br />
                    <button type="submit" style={{ background: "darkgreen", color: "wheat", borderRadius: "10px", height: "4vh", width: "5vw", fontSize: "medium" }}>➕Post</button>
                </form>
                <br />

                <button onClick={() => nav(`/home/${localStorage.getItem('Id')}`)} style={{ background: "darkgreen", color: "wheat", width: "5vw", fontSize: "small", borderRadius: "10px", height: "4vh" }}>Back</button>
            </div>
            <Footer />
        </>
    )
}